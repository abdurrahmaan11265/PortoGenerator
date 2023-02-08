const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const fs = require('fs-extra');
const multer = require("multer");
const admZip = require("adm-zip");

let folderNumber = 0;
let semaphore = false;
let tempFileNumber = 0;
let multipleUpload = [];
// let skillImgNames = [];


// multer related work
//asdfasdfasdf
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        tempFileNumber++;
        let tempFolderName = 'temp' + tempFileNumber;
        fs.mkdir(__dirname + `/${tempFolderName}`, (err) => {
            if (err) {
                console.log("error occurred in creating new directory", err);
                return;
            }
            // console.log("New directory created successfully");
        });
        cb(null, __dirname + `/${tempFolderName}`);
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "." + file.originalname.split('.').pop());
    }
});
let upload = multer({ storage: storage });


let storage1 = multer.diskStorage({
    destination: (req, file, cb) => {
        tempFileNumber++;
        let tempFolderName = 'temp' + tempFileNumber;
        fs.mkdir(__dirname + `/${tempFolderName}`, (err) => {
            if (err) {
                console.log("error occurred in creating new directory", err);
                return;
            }
            // console.log("New directory created successfully");
        });
        cb(null, __dirname + `/${tempFolderName}`);
    },
    filename: (req, file, cb) => {
        // skillImgNames.push(file.fieldname + "." + file.originalname.split('.').pop());
        cb(null, file.fieldname + "." + file.originalname.split('.').pop());
    }
});
let upload1 = multer({ storage: storage1 });


// setting of the playground
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get("/", function (req, res) {
    res.render("home");
});

app.get("/create", (req, res) => {
    while (semaphore) {

    }
    semaphore = true;
    folderNumber++;
    let folderName = 'portfolio' + folderNumber;
    let destination = __dirname + `/${folderName}`;
    let source = __dirname + '/portfolio';
    fs.copy(source, destination, { overwrite: true }, function (err) {
        if (err) {
            console.log('An error occured while copying the folder.')
            return console.error(err)
        }
        // console.log('Copy completed!');
    });
    res.render("create", { folderName: folderName });
    semaphore = false;
});




app.post("/create", upload.single('image'), (req, res) => {
    let personInfo = {};
    personInfo.firstInfo = req.body;
    let folderName = personInfo.firstInfo.folderName;
    let skillsNumber = personInfo.firstInfo.skillsNumber;
    let imageName = req.file.filename;

    let oldPath = req.file.destination;
    let newPath = __dirname + `/${folderName}/public/images/intro`;
    fs.move(oldPath, newPath, err => {
        if (err) return console.error(err);
        // console.log('success!');
    });
    let cssVariables = "";
    switch (personInfo.firstInfo.pallet) {
        case 'option1':
            cssVariables = ":root{--bgcolour1:#60ddf0;--bgcolour2:#074681;--colour1:#3dbc69;--colour2:#a8d6e2;--family1:'Dancing Script';--family2:'Raleway';--family3:'Aboreto'}"
            break;
        case 'option2':
            cssVariables = ":root{--bgcolour1:#8a2207;--bgcolour2:#eb771f;--colour1:#efd98e;--colour2:#37170b;--family1:'Dancing Script';--family2:'Raleway';--family3:'Aboreto'}"
            break;
        case 'option3':
            cssVariables = ":root{--bgcolour1:#492211;--bgcolour2:#67666b;--colour1:#efd98e;--colour2:#cb7931;--family1:'Dancing Script';--family2:'Raleway';--family3:'Aboreto'}"
            break;
        case 'option4':
            cssVariables = ":root{--bgcolour1:#f9cd4d;--bgcolour2:#fc902e;--colour1:#232126;--colour2:#5264eb;--family1:'Dancing Script';--family2:'Raleway';--family3:'Aboreto'}"
            break;
        case 'option5':
            cssVariables = ":root{--bgcolour1:#941c27;--bgcolour2:#faad5e;--colour1:#bdc4c3;--colour2:#2da9a1;--family1:'Dancing Script';--family2:'Raleway';--family3:'Aboreto'}"
            break;
        case 'option6':
            cssVariables = ":root{--bgcolour1:#285397;--bgcolour2:#933c74;--colour1:#f7df9e;--colour2:#f47467;--family1:'Dancing Script';--family2:'Raleway';--family3:'Aboreto'}"
            break;
        case 'option7':
            cssVariables = ":root{--bgcolour1:#abc5c1;--bgcolour2:#fec158;--colour1:#e6b775;--colour2:#263b39;--family1:'Dancing Script';--family2:'Raleway';--family3:'Aboreto'}"
            break;

        default:
            console.log("invalied input!!");
            break;
    }
    let CSSFileData = `${cssVariables}* {padding: 0;margin: 0;}body {padding: 0;margin: 0;text-align: center;line-height: 2;}h1 {font-family: var(--family1);font-size: 4rem;color: var(--colour1);font-weight: 600;}h2 {font-size: 2rem;font-family: var(--family2);color: var(--colour2);font-weight: 600;}p {font-weight: 600;font-family: var(--family2);color: var(--colour3);margin: 0;}.intro {text-align: center;}.intro p {font-size: 2rem;font-family: var(--family3);color: var(--bgcolour2);}.intro span {text-decoration: underline;}.intro_container {background: var(--bgcolour1);height: 100vh;padding-top: 40vh;}.clouds {height: 11rem;position: relative;z-index: 1;}hr {border-style: dotted;border-top: none;border-width: 2rem;width: 8rem;color: var(--bgcolour1);margin: 3rem auto 3rem auto;}#mypic {height: 18rem;margin: 0 auto 3rem auto;}.skills{display: flex;justify-content: space-around;margin-top: 2rem;}.skills_text {width: 50%;}.skills img {height: 12rem;}.footer {font-family: 'Raleway', sans-serif;margin: 3rem auto 0 auto;background-color: var(--bgcolour2);color: var(--colour1);font-weight: bold;padding: 0 }.footer_images img {height: 4rem;margin: 1rem;}#cloud1 {bottom: 100%;right: 9%;}#cloud2 {right: 16%;}#cloud3 {bottom: 79%;right: -8%;}#cloud4 {bottom: 72%;right: -19%;}`;
    let CSSFileDataPhone = `${cssVariables}* {padding: 0;margin: 0;}body {padding: 0;margin: 0;text-align: center;line-height: 2;}h1 {font-family: var(--family1);font-size: 4rem;color: var(--colour1);font-weight: 600;}h2 {font-size: 2rem;font-family: var(--family2);color: var(--colour2);font-weight: 600;}p {font-weight: 600;font-family: var(--family2);color: var(--colour3);margin: 0;}.intro {text-align: center;}.intro p {font-size: 2rem;font-family: var(--family3);color: var(--bgcolour2);}.intro span {text-decoration: underline;}.intro_container {background: var(--bgcolour1);height: 100vh;padding-top: 40vh;}.clouds {height: 11rem;position: relative;z-index: 1;}hr {border-style: dotted;border-top: none;border-width: 2rem;width: 8rem;color: var(--bgcolour1);margin: 3rem auto 3rem auto;}#mypic {height: 18rem;margin: 0 auto 3rem auto;}.skills{display: flex;justify-content: space-around;margin-top: 2rem;}.skills_text {width: 50%;}.skills img {height: 12rem;}.footer {font-family: 'Raleway', sans-serif;margin: 3rem auto 0 auto;background-color: var(--bgcolour2);color: var(--colour1);font-weight: bold;padding: 0 }.footer_images img {height: 4rem;margin: 1rem;}#cloud1 {bottom: 100%;right: 9%;}#cloud2 {right: 16%;}#cloud3 {bottom: 79%;right: -8%;}#cloud4 {bottom: 72%;right: -19%;}`
    let CSSFileDataTablet = `${cssVariables}* {padding: 0;margin: 0;}body {padding: 0;margin: 0;text-align: center;line-height: 2;}h1 {font-family: var(--family1);font-size: 4rem;color: var(--colour1);font-weight: 600;}h2 {font-size: 2rem;font-family: var(--family2);color: var(--colour2);font-weight: 600;}p {font-weight: 600;font-family: var(--family2);color: var(--colour3);margin: 0;}.intro {text-align: center;}.intro p {font-size: 2rem;font-family: var(--family3);color: var(--bgcolour2);}.intro span {text-decoration: underline;}.intro_container {background: var(--bgcolour1);height: 100vh;padding-top: 40vh;}.clouds {height: 11rem;position: relative;z-index: 1;}hr {border-style: dotted;border-top: none;border-width: 2rem;width: 8rem;color: var(--bgcolour1);margin: 3rem auto 3rem auto;}#mypic {height: 18rem;margin: 0 auto 3rem auto;}.skills{display: flex;justify-content: space-around;margin-top: 2rem;}.skills_text {width: 50%;}.skills img {height: 12rem;}.footer {font-family: 'Raleway', sans-serif;margin: 3rem auto 0 auto;background-color: var(--bgcolour2);color: var(--colour1);font-weight: bold;padding: 0 }.footer_images img {height: 4rem;margin: 1rem;}#cloud1 {bottom: 100%;right: 9%;}#cloud2 {right: 16%;}#cloud3 {bottom: 79%;right: -8%;}#cloud4 {bottom: 72%;right: -19%;}`

    fs.writeFile(__dirname + `/${folderName}/public/CSS/style.css`, CSSFileData, (err) => {
        if (err) throw err;
    });
    fs.writeFile(__dirname + `/${folderName}/public/CSS/phone_style.css`, CSSFileDataPhone, (err) => {
        if (err) throw err;
    });
    fs.writeFile(__dirname + `/${folderName}/public/CSS/tablet_style.css`, CSSFileDataTablet, (err) => {
        if (err) throw err;
    });


    res.render("create1", { personInfo: personInfo, folderName: folderName, skillsNumber: skillsNumber, imageName: imageName });

    // multiple fiels json for multer
    for (let i = 1; i <= personInfo.firstInfo.skillsNumber; i++) {
        multipleUpload.push({ name: 'skillImg' + i });
    }

});

let uploadMultiple = upload1.fields(multipleUpload);
app.post("/create1", uploadMultiple, (req, res) => {
    let personInfo = {};
    let temp = '';
    let temp1 = '';
    personInfo.secondInfo = req.body;
    let imageName = personInfo.secondInfo.imageName;
    let folderName = personInfo.secondInfo.folderName;
    let skillsNumber = personInfo.secondInfo.skillsNumber;

    for (let i = 1; i <= skillsNumber; i++) {
        temp = 'req.files.skillImg' + i + '[0].destination';
        temp1 = 'req.files.skillImg' + i + '[0].filename';

        let oldPath = eval(temp) + '/' + eval(temp1);
        let newPath = __dirname + `/${folderName}/public/images/skills` + `/${eval(temp1)}`;


        fs.move(oldPath, newPath, err => {
            if (err) return console.error(err);
        });
    }

    let skillHeadings = [];
    let skillDescriptions = [];

    for (let i = 1; i <= skillsNumber; i++) {
        temp = 'personInfo.secondInfo.skill' + i;
        skillHeadings.push(eval(temp));
        temp = 'personInfo.secondInfo.skillDescription' + i;
        skillDescriptions.push(eval(temp));

    }

    let skillsDiv = `<div class="myskills"><h1>My skills : </h1>`;

    for (let i = 0; i < skillsNumber; i++) {
        temp1 = 'req.files.skillImg' + (i + 1) + '[0].filename';
        skillsDiv = skillsDiv + `<div class="skills">
        <img src="../public/images/skills/${eval(temp1)}" alt="computer-Image">
        <div class="skills_text">
            <h2>${skillHeadings[i]}</h2>
            <p >${skillDescriptions[i]}</p>
        </div>
    </div>`;
        if (i == skillsNumber) {
            skillsDiv = skillsDiv + '</div>';
        }
    }

    let EJSFileData = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Personal portofolio</title>
    
        <!-- linking bootstrap -->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
        
        <!-- linking personal css -->
        <link rel="stylesheet" media="screen and (max-width: 767px)" href="../public/CSS/phone_style.css">
        <link rel="stylesheet" media="screen and (min-width: 767px) and (max-width: 1023px)" href="../public/CSS/tablet_style.css">
        <link rel="stylesheet" media="screen and (min-width: 1024px)" href="../public/CSS/style.css">
        <link rel="stylesheet" href="../public/CSS/button_style.css">
        <!-- linking google fonts  -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Aboreto&family=Dancing+Script&family=Lobster&family=Raleway:wght@100;400&display=swap" rel="stylesheet"> 
    
    </head>
    <body><div class="intro_container"><div class="intro"><h1 id="intro_heading">I'm ${personInfo.secondInfo.name}</h1>
<p>${personInfo.secondInfo.profession}</p></div></div>

    <hr>

    <div class="aboutme">
        <img id="mypic" src="../public/images/intro/${imageName}" alt="My-Picture">
<h1>Hello.</h1><p></p>${personInfo.secondInfo.helloText}</p>
    </div><hr>${skillsDiv}<hr><div class="in_touch"><h1>Get in touch</h1> <p>${personInfo.secondInfo.getInText}</p><br><br><a class="styled_button" href="mailto:${personInfo.secondInfo.email}">CONTACT ME</a></div><div class="footer"><div class="footer_images"><a href="https://www.instagram.com/${personInfo.secondInfo.instaId}/?hl=en"><img src="../public/images/contact/instagram.png" alt="Instagram"></a><a href="mailto:${personInfo.secondInfo.email}"><img src="../public/images/contact/mail.png" alt="Gmail"></a><p>© 2022 ${personInfo.secondInfo.name}.</p></div></div>     <!-- linking bootsrtaps js -->
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js" integrity="sha384-oBqDVmMz9ATKxIep9tiCxS/Z9fNfEXiDAYTujMAeBAsjFuCZSmKbSSUnQlmh/jp3" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.min.js" integrity="sha384-IDwe1+LCz02ROU9k972gdyvl+AESN10+x7tBKgc9I5HFtuNz0wWnPclzo6p9vxnk" crossorigin="anonymous"></script>
    <!-- linking custom js file -->
    <script src="javascript/index.js"></script>
</body>
</html>`;

    fs.writeFile(__dirname + `/${folderName}/views/index.html`, EJSFileData, (err) => {
        if (err) throw err;
    });

    res.render('result', { folderName: folderName });

});

app.post("/result", (req, res) => {
    let folderName = req.body.folderName;
    const outputFile = Date.now() + "_your_portfolio.zip";
    async function createZipArchive() {
        const zip = new admZip();
        zip.addLocalFolder(`./${folderName}`);
        zip.writeZip(outputFile);
        console.log(`Created ${outputFile} successfully`);
        fs.rm(`./${folderName}`, { recursive: true, force: true }, (err) => {
            if (err) { throw err }
            console.log(`${folderName} is deleted!`)
        });
        res.download(outputFile, (err) => {
            if (err) {
                console.log("error while downloading files");
            }
            fs.unlink(`./${outputFile}`, (err) => {
                if (err) { throw err }
                console.log(`${outputFile} has been deleted`);
            });
        });
    }
    createZipArchive();
});

app.get("/contact", (req, res) => {
    res.render("contact");
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.get("/documentation", (req, res) => {
    res.render("documentation");
});








app.listen(process.env.PORT || 3000, function () {
    console.log("Server started on port 3000");
});