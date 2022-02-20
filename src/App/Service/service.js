    import DataBaseIpad from './data-base/data-base-ipad.json';
    
    class Service {
        getData = () => {
            const data = Object.entries(DataBaseIpad);
            return data;
        }

        getAllModels = () => {
            const allModels = this.getData().filter(item => item[1].type === "models");
            return allModels;
        }

// getTargetTechnic - принимает тип техники в качестве аргумента в виде строки.Например: ipad, mac, iphone...
        getTargetTechnic = (typeTechnic) => {
            const technic = this.getAllModels().filter(item => item[1].family === typeTechnic);
            return technic;
        }

        getTargetModel = (id) => {
            const model = this.getAllModels().filter(item => item[1].id === id)
            return model;
        }

        getDescription = (itemName) => {
            const description = this.getData().filter(item => item[1].name === itemName);
            return {
                title: description[0][0],
                create: description[0][1].create,
                description: description[0][1].description,
                family: description[0][1].family,
                specifications: description[0][1].specifications
            }
        } 
    }

    export default Service;