const { render } = require('ejs');
const express = require('express');
const {
    default: mongoose
} = require('mongoose');
const app = express();
const path = require('path');
const User = require('./models/user');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))
app.use(express.urlencoded({
    extended: true
}))

app.get('/', (req, res) => {
    res.redirect('users')
})

app.get('/allusers', (req, res) => {
    res.render('login')
})

mongoose.connect(
    "mongodb+srv://royal:bargav@sr-bro.9cvluiq.mongodb.net/?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }b hu n
).then(() => {
    const port = 3015;
    app.listen(port, () => {
        console.log("Running on port", port)
    })
    console.log("connected to database")
});

app.post('/getform', async (req, res) => {
    console.log(req.body)
    const username = req.body.username
    const password = req.body.password
    const newUser = new User({
        username: username,
        password: password
    });
    await newUser.save();
    console.log("done")
    res.redirect('/users')
})

app.get('/users', async (req, res) => {
    const allUsers = await User.find();
    // console.log(allUsers);
    res.render('users', {allUsers})
})

app.get('/sortasc', async (req, res) => {
    const allUsers = await User.find().sort({username:1});
    // console.log(allUsers);
    res.render('users', {allUsers})
})

app.get('/sortdesc', async (req, res) => {
    const allUsers = await User.find().sort({username:-1});
    // console.log(allUsers);
    res.render('users', {allUsers})
})

app.get("/findUser",(req,res)=>{
    res.render("find")
})

app.post("/getUser",async(req,res)=>{
// try {
//     const username = req.body.username
//     const u = await User.findOne({username: username})
//     console.log(u);
//     res.render("show",{u})
// } catch (error) {
//    console.log(error) 
// }

let allUsers = [];
const all_users = await User.find();
const users_len = all_users.length;
for(let i=0;i<users_len;i++)
{
    let text = all_users[i].username.toLowerCase();
    let pattern = req.body.username.toLowerCase();
    let result = text.match(pattern);
    if(result)
    {
        let search_users = {
            username : all_users[i].username,
            password : all_users[i].password
        }
        allUsers.push(search_users);
    }
}

res.render('user', {allUsers})
})

app.get("/change/:id", async (req,res) => {
    const id = req.params.id;
    // console.log(id)
    const user = await User.findById(id)
    console.log(user)
    res.render('edit', {user})
})

app.post("/update/:id" , async (req,res) => {
    const id = req.params.id
    // console.log(id, req.body.username)
    await User.findByIdAndUpdate(id, {username: req.body.username});
    res.redirect('/users')
})

app.get('/delete/:id', async (req, res) => {
    const id = req.params.id;
    await User.findOneAndDelete({_id : id});
    console.log('deleted')
    res.redirect('/users')
})