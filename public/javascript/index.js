
// function for file size validation for create page
$(function () {
    var fileInput = $('.upload-file');
    var maxSize = fileInput.data('max-size');
    $('.upload-form').submit(function (e) {
        if (fileInput.get(0).files.length) {
            var fileSize = fileInput.get(0).files[0].size; // in bytes
            if (fileSize > maxSize) {
                alert('file size is more than 1 mb');
                return false;
            } else {
                // alert('file size is correct - '+fileSize+' bytes');
            }
        } else {
            alert('Please select the file to upload');
            return false;
        }

    });
});

// function for file size validation for create1 page
let filesNumber = $('input[type=file]').length;
let fileIds = [];
let outputIds = [];
let temp;
for (let i = 1; i <= filesNumber; i++) {
    temp = '#skillImg' + i.toString();
    fileIds.push(temp);
    temp = '#output' + i.toString();
    outputIds.push(temp);
}
for (let i = 0; i < outputIds.length; i++) {
    $(function () {
        var fileInput = $(fileIds[i]);
        var maxSize = fileInput.data('max-size');
        $('.upload-form1').submit(function (e) {
            if (fileInput.get(0).files.length) {
                var fileSize = fileInput.get(0).files[0].size; // in bytes
                if (fileSize > maxSize) {
                    alert('file size is more than 1 mb of skill ' + (i + 1) + ' image');
                    return false;
                } else {
                    // alert('file size is correct - '+fileSize+' bytes');
                }
            } else {
                alert('Please select the file to upload');
                return false;
            }

        });
    });
}

let form3Wrapper = $(".form3Wrapper");
let form3Btn = $("#form3Btn");
let form3 = $(".form3");

form3Btn.on("click", () => {

    setTimeout(() => {
        form3.html(`<div class ="mb-3">
        <p>Please go through our documentation to launch your site in local machine.</p> 
    </div>
    <a href="/documentation" class = "btn btn-info">Documentation</a>`);
    }, 3000);
});

let typed = new Typed(".auto-type", {
    strings: ["not just a website.", "your future."],
    typeSpeed: 40,
    backSpeed: 40,
    loop: true
})

function gc_detect_visibility(query,custom_funtion){

    let calculator = function(query,custom_funtion){
        
        let element = document.querySelector(query);

        let element_top_offset = element.offsetTop;
        let element_bottom_offset = element.offsetHeight + element_top_offset;

        let screen_top_offset = window.scrollY;
        let screen_bottom_offset = screen_top_offset + window.innerHeight;

        if(element_top_offset > screen_top_offset && screen_bottom_offset > element_bottom_offset){
            custom_funtion(element);
        }
    } 

    calculator(query,custom_funtion);

    document.addEventListener('scroll',calculator.bind(null,query,custom_funtion));
}




//loader function
// $(window).on("load", function () {
//     $(".loader-wrapper").fadeOut("slow");
// });