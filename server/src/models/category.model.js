import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
    name: {
        type: String
    }
})

// to add new category in DB
categorySchema.statics.addCategory = async function(name){
    if(!name) {
        throw Error('field must be filled')
    }

    const existedCategory = await this.findOne({ name })

    if(existedCategory) {
        throw Error('Category already exist')
    }

    const category = await this.create({ name })

    return category
}

// to get all categories in a array
categorySchema.statics.getAllCategory = async function() {
    const categories = await this.find({}, 'name'); // Retrieves only the 'name' field
    return categories.map(category => category.name);
 
}



export const Category = mongoose.model("Category",categorySchema)