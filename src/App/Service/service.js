    import DataBaseIpad from './data-base/data-base-ipad.json';
    import DataBaseIphone from './data-base/data-base-iphone.json';
    import DataBaseWatch from './data-base/data-base-watch.json';
    import DataBaseMac from './data-base/data-base-mac.json';
    
    class Service {
        getData = () => {
            const allDataBase = Object.assign(DataBaseIphone,DataBaseIpad,DataBaseWatch,DataBaseMac)
            const data = Object.entries(allDataBase);
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

        getNewModels = () => {
            const newModels = this.getAllModels().filter(item => item[1].hasOwnProperty('newProduct'))
            return newModels;
        }

        getSaleModels = () => {
            const saleModels = this.getAllModels().filter(item => item[1].hasOwnProperty('salePrice'))
            return saleModels;
        }

        getProductOfTheDay = () => {
            const productOfTheDay = this.getAllModels().filter(item => item[1].hasOwnProperty('productOfTheDay'))
            return productOfTheDay;
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