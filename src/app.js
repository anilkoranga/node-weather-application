const path =require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')

const forecast=require('./utils/forecast')

const app=express()

//define paths for express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath =path.join(__dirname,'../templates/views')
const partialPath=path.join(__dirname,'../templates/partials')

//setup handlebars and view locations
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('',(req,res)=>{

    res.render('index',{
        title:'Weather App ',
        Developer:'Anil'
    })
})

app.get('/about',(req,res)=>{
       res.render('about',{
           title:'About me',
           Developer:'Anil'


       })
})

app.get('/help',(req,res)=>{

    res.render('help',{

        title:'Help page',
        message:'This is the help page ',
        Developer:'Anil'
    })
})

app.get('/weather',(req,res)=>{
    if (!req.query.address){
       return res.send({
        error:'You must provide an address'
       })
            
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
         if(error){

            return res.send({error})
         }
         forecast(latitude,longitude,(error,forecastData)=>{
             if(error){
               return res.send({error})

             }
             res.send({
              forecast:forecastData,location,
               address:req.query.address

             })


         })

    })
    //    res.send({

    //  forecast:'It is snowing',
    //  location:'Philadephia',
    //  address:req.query.address

    // })
})

app.get('/products',(req,res)=>{
    if (!req.query.search){
        return res.send({
            error:'you must provide a search term'
        })
          
     }
     console.log(req.query)
  
      res.send({
        products:[]  
      })

})

app.get('/help/*',(req,res)=>{

res.render('404',{
   title:'404',
   Developer:'Anil',
   errorMessage:'Help article not found'
})

})

app.get('*',(req,res)=>{

    res.render('404',{
        title:'404',
        Developer:'Anil',
        errorMessage:'Page Not Found'

    })
})

app.listen(3000,()=>{

console.log('Server is up on 3000!')

})

