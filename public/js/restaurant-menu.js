$(function() {

    $(".product_collection").on("change", () => {
        const selected_value = $(".product_collection").val();
        if(selected_value === "drink") {
            $("#product_volume").show();
            $("#product_size").hide();
        } else {
            $("#product_volume").hide();
            $("#product_size").show();
        }            
    });

    $(".hiding_btn").on("click", () => {
        $(".dish_container").slideToggle(3000);
        $(".hiding_btn").css("display", "none");
    })
});

//product status changer
$(".new_product_status").on("change", async function(e) {
    const id = e.target.id;
    const product_status = $(`#${id}.new_product_status`).val();
    try {
        const response = await axios.post(
            `/resto/products/edit/${id}`, 
            {id: id, product_status: product_status}
        );
        console.log(response)
        const result = response.data;
        console.log("result:", result);

        if(result.state == 'muvaffaqiyatli') {
            alert('success');
            location.reload();
        } else {
            alert(result.message);
        }
    } catch(err) {
        console.log('updateChosenProduct err:', err);
    }
});

function validateForm() {
    const restaurant_mb_id = $(".restaurant_mb_id").val(),
    product_name = $(".product_name").val(),
    product_price = $(".product_price").val(),
    product_left_cnt = $(".product_left_cnt").val(),
    product_collection = $(".product_collection ").val(),
    product_description = $(".product_description").val(),
    product_status = $(".product_status").val();
    
    if(
        restaurant_mb_id == '' || 
        product_name == '' || 
        product_price == '' || 
        product_left_cnt == '' ||
        product_collection == ''  || 
        product_description == '' || 
        product_status == '') {
            alert("Iltimos hamma ma'limotlarni kiriting!");
            return false;
    } else return true;
}

function previewFileHandler(input, order) {

    console.log(input)
    const image_class_name = input.className;
    console.log(image_class_name)
    const file =  $(`.${image_class_name}`).get(0).files[0],

    fileType = file['type'],
    validImageTypes = ['image/jpg', 'image/jpeg', 'image/png'];
    
    if(!validImageTypes.includes(fileType)) {
    alert("Iltimos ruhsat etilgan formatdagi rasmlarni yuklang:  (jpg, jpeg, png)");
    } else {
        if(file) {
            let reader = new FileReader();
            reader.onload = function() {
                $(`#image_section_${order}`).attr("src", reader.result); 
            }  
            reader.readAsDataURL(file);             
        }
    }
}