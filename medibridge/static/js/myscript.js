$('#slider1, #slider2, #slider3, #slider4').owlCarousel({
    loop: true,
    margin: 25,
    responsiveClass: true,
    autoplayTimeout: 3000,
    dots: true,
    autoplayHoverPause: true,
    responsive: {
        0: { items: 1, nav: false, autoplay: true },
        600: { items: 3, nav: true, autoplay: true },
        1000: { items: 4, nav: true, loop: true, autoplay: true }
    }
});
$(document).ready(function () {
    // Increase Quantity
    $(".plus-cart").click(function () {
        var id = $(this).attr("pid").toString();  // Get the product ID from the 'pid' attribute
        var quantityElement = $(this).siblings("span");

        $.ajax({
            type: "GET",
            url: "/pluscart/",  // URL to increase quantity
            data: {
                product_id: id
            },
            success: function (data) {
                quantityElement.text(data.quantity);  // Update quantity on the page
                $("#amount").text("Rs. " + data.amount);  // Update amount
                $("#totalamount").text("Rs. " + data.total_amount);  // Update total amount
            },
            error: function (xhr, status, error) {
                console.error("Error: ", error);  // Log any error to the console
            }
        });
    });

    // Decrease Quantity
    $(".minus-cart").click(function () {
        var id = $(this).attr("pid").toString();  // Get the product ID from the 'pid' attribute
        var quantityElement = $(this).siblings("span");

        $.ajax({
            type: "GET",
            url: "/minuscart/",  // URL to decrease quantity
            data: {
                product_id: id
            },
            success: function (data) {
                if (data.quantity === 0) {
                    location.reload();  // Reload the page if item is removed from the cart
                } else {
                    quantityElement.text(data.quantity);  // Update quantity on the page
                    $("#amount").text("Rs. " + data.amount);  // Update amount
                    $("#totalamount").text("Rs. " + data.total_amount);  // Update total amount
                }
            },
            error: function (xhr, status, error) {
                console.error("Error: ", error);  // Log any error to the console
            }
        });
    });

    // Remove Item
    $(".remove-item").click(function () {
        var id = $(this).attr("pid").toString();  // Get the product ID from the 'pid' attribute
        var rowElement = $(this).closest(".row");

        $.ajax({
            type: "GET",
            url: "/removecart/",  // URL to remove item from the cart
            data: {
                product_id: id
            },
            success: function (data) {
                rowElement.fadeOut(500, function () {  // Fade out the removed item
                    $(this).remove();
                });
                $("#amount").text("Rs. " + data.amount);  // Update amount
                $("#totalamount").text("Rs. " + data.total_amount);  // Update total amount
            },
            error: function (xhr, status, error) {
                console.error("Error: ", error);  // Log any error to the console
            }
        });
    });
});

$(document).ready(function () {
    function updateCartCount() {
        $.ajax({
            url: "/get-cart-count/",  // Create a new URL pattern in urls.py
            type: "GET",
            success: function (data) {
                $("#cart-count").text(data.count);
            }
        });
    }

    $(".plus-cart, .minus-cart, .remove-item").click(function () {
        setTimeout(updateCartCount, 500); // Update the cart count after changes
    });
});
