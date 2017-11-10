const fs = require('fs');
const schema = require('./schema.js');

/*
* HELPERS
* */

const dir = {
    create: (path) => {
        dir.remove(path);
        fs.mkdirSync(path);
    },
    remove: (path) => {
        if (fs.existsSync(path)) {
            fs.readdirSync(path).forEach(function(file){
                let curPath = path + "/" + file;
                if (fs.lstatSync(curPath).isDirectory()) {
                    // --- recurse ---
                    dir.remove(curPath);
                } else {
                    // --- delete file ---
                    fs.unlinkSync(curPath);
                }
            });
            fs.rmdirSync(path);
        }
    }
};

const file = {
    write: (path, schema) => {
        try{
            fs.writeFileSync(path, schema, 'utf8');
        } catch(e){
            console.log('WRITE FILE ERROR:', e);
        }
    }
};

/*
* MAIN PART
* */

const stateless = (name) => {
    let str = `const ${name} = (props) => {`;
    str += '\n    return(';
    str += '\n        <div>';
    str += '\n        </div>';
    str += '\n    );';
    str += '\n};';
    return str;
};

const statefull = (name, schema) => {
    let { method, state } = schema;

    let str = `class ${name} extends React.Component{`;

    if(state){
        state = state ? (state.map(line => `\n        ${line}`)) : "";
        str += `\n    state = {${state}\n    };\n`;
    }

    if(method){
        method = method ? (method.map(name => `${name}(){\n\n    };`).join('\n\n    ')) : "";
        str += '\n    ' + method + '\n';
    }

    str += '\n}';

    return str;
};

const create_schema = (obj, _path) => {
    switch(obj.type){

        case "component":
            let file_path = _path + obj.name + '.js';
            let schema = (({ name, schema }, path) => {
                switch(schema.type){
                    case "statefull": return statefull(name, schema);
                    case "stateless": return stateless(name);
                    default: throw Error('No type of schema in component!', name, path);
                }
            })(obj, file_path);

            file.write(file_path, schema);
            break;

        case "folder":
            let folder_path = _path + obj.name;
            dir.create(folder_path);

            if(obj.items.length > 0){
                obj.items.forEach(item =>{
                    create_schema(item, folder_path + '/');
                });
            }
            break;

        default:
            return false;
    }
};


/*
* RUN CODE
* */
create_schema(schema.global, __dirname + '/');







