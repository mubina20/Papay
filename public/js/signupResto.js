$(function() {
    let fileTarget = $('.filebox .upload-hidden');
    let filename = '';

    fileTarget.on("change", function() {
        if(window.FileReader) {
            const uploading_file = $(this)[0].files[0]; 
            const fileType = uploading_file["type"]; 
            const validImageTypes = ["image/jpg", "image/jpeg", "image/png"]; 

            if(!validImageTypes.includes(fileType)) { 
                alert("Iltimos ruhsat etilgan formatdagi rasmlarni yuklang: jpg, jpeg, va png!");
            } else {
                if(uploading_file) { 
                    console.log(URL.createObjectURL(uploading_file)); 
                    $(".upload_img_frame") 
                        .attr("src", URL.createObjectURL(uploading_file)) 
                }
                filename = uploading_file.name; 
            }
        }

        $(this).siblings(".upload-name").val(filename);
    });
});

function validateSignUpForm() {
    const mb_nick = $(".mb_nick").val();
    const mb_phone = $(".mb_phone").val();
    const mb_password = $(".mb_password").val();
    const mb_confirm_password = $(".mb_confirm_password").val();
    const restaurant_img = $(".restaurant_img").get(0).files[0] ?? null;

    if(mb_nick == "" || mb_phone == "" || mb_password == "" || mb_confirm_password == "") {
        alert('Iltimos hamma malumotlarni kiriting!');
        return false;

    } else if(mb_password !== mb_confirm_password) {
        alert(`Iltimos passwordni to'g'ri kiriting!`);
        return false;
    }

    if(!restaurant_img) {
        alert('Iltimos rasmni yuklang!');
        return false;
    }

    return true;
}