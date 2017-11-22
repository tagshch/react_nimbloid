const simple_stateful_component = {
    "type": "stateful",
    "method": ["init","componentDidMount","render"],
    "state": [
        'age: 15',
        'name: "John"'
    ]
};

const simple_stateless_component = {
    "type": "stateless"
};

const global_schema = {
    "type": "folder",
    "name": "src",
    "items": [
        {
            "type": "component",
            "name": "App",
            "schema": simple_stateful_component
        },
        {
            "type": "component",
            "name": "StatelessApp",
            "schema": simple_stateless_component
        },
        {
            "type": "folder",
            "name": "components",
            "items": [
                {
                    "type": "component",
                    "name": "SubApp",
                    "schema": simple_stateless_component
                },
                {
                    "type": "folder",
                    "name": "empty_folder"
                }
            ]
        }
    ]
};

module.exports = {
    global: global_schema
};