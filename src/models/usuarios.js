import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const usuarioSchema = new mongoose.Schema({
    username:{type:String,require:true}, 
    contrasena:{type:String,require:true},
})
usuarioSchema.methods.encrypt = (contrasena)=>{
    return bcrypt.hashSync(contrasena,bcrypt.genSaltSync(10))
}
usuarioSchema.methods.comparar = (contrasena,passWord)=>{
    return bcrypt.compareSync(contrasena,passWord)
}

export default mongoose.model('usuarios',usuarioSchema)