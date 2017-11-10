const component_statefull = {
    "type": "statefull",
    "method": ["render"],
    "state": [
        'age: 15',
        'name: "John"'
    ]
};

const component_stateless = {
    "type": "stateless"
};

const global_schema = {
    "type": "folder",
    "name": "src",
    "items": [
        {
            "type": "component",
            "name": "App",
            "schema": component_statefull
        },
        {
            "type": "component",
            "name": "StatelessApp",
            "schema": component_stateless
        },
        {
            "type": "folder",
            "name": "components",
            "items": [{
                "type": "component",
                "name": "SubApp",
                "schema": component_stateless
            }]
        }
    ]
};

module.exports = {
    global: global_schema
};