const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const chambreSchema =new Schema({
    id_chambre: {type: Number,required: true},
  num:{ type:Number, required: true },
  num_etage : {type: Number,required: true },
  prix : { type: Number,required: true}
});

module.exports = mongoose.model('chambre', chambreSchema);