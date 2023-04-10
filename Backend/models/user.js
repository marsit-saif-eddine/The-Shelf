const mongoose=require('mongoose');
const Schema=mongoose.Schema;


var UserSchema=new Schema(

    {
        firstname: {
            type: String,
            //required: true,
            trim: true,
        },

        lastname: {
            type: String,
            //required: true,
            trim: true,
        },
        
        username: {
            type: String
        },
        password: {
            type: String,
            //required: true,
        },

        email: {
            type: String,
           // required: true,
           // unique: true,
            trim: true,
            validate: {
              validator: function (email) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            // Here's what each part of the pattern means:

            // ^ indicates the beginning of the string
            // [^\s@]+ matches one or more characters that are not whitespace or @ symbol
            // @ matches the "@" symbol
            // \. matches (.) character
            // $ indicates the end of the string
                return emailRegex.test(email);
              },
              message: props => `${props.value} is not a valid email address!`
            },
        },

        profile_photo: {
            type: String,
        },

        phone_number:{
            type: Number,

        },

        address: {
            type: String
        },

        fav_genre: [],
        fav_author: [],

        role: {
            type: String,
            required: false,
            enum: {
                values: ['club_manager','admin','client'],
                message: '{VALUE} is not supported'
              }
              
        },

        rating:
            { type:[Rate],
              default:[]
            },

        // is_banned: {
        //     type: Boolean,
        //     default: false,
        // },

        // is_active:{
        //     type:Boolean,
        //     default:true
        // }
        status:{
            type: String,
            // required: true,
            enum: {
                values: ['active','inactive','banned'],
                message: '{VALUE} is not supported'
              }
        },
        googleId:String,
        secret:String,
        ability: [],
        isConfirmed:{type:Boolean}
        
    }
);

var Rate = new Schema(
    {
        user_id: String,
        rate: Number
    }
)

module.exports=mongoose.model('users',UserSchema)