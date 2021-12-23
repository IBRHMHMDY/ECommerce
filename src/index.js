import '@laylazi/bootstrap-rtl/dist/css/bootstrap-rtl.min.css'
import './css/style.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'jquery/dist/jquery.min';
import 'popper.js/dist/popper.min';
import '@fortawesome/fontawesome-free/js/all.min';
import 'webpack-jquery-ui';
import 'webpack-jquery-ui/css';
import 'jquery-ui-touch-punch/jquery.ui.touch-punch.min.js';

$(function () {
    // Show&Hide Tooltip
    $('[data-toggle="tooltip"]').tooltip();

    //  Alert to Add to Cart Button
    $('.btn-add-to-cart').click(function(){
      alert('أضيف المٌنتج الى عربة الشراء');
    });

    // Add Year to Footer Dynamically
    $('#copyright').text("جميع الحقوق محفوظة للمتجر  " + new Date().getFullYear());

    // Add Ative Class to Product Option Selected by User
    $('.product-option input[type="radio"]').change(function(){
      $(this).parents('.product-option').siblings().removeClass('active');
      $(this).parents('.product-option').addClass('active');
    });

    // Get Total Price Per Product
    $('[data-product-quantity]').change(function(){
      var newQuantity = $(this).val();

      var parent = $(this).parents('[data-product-info]');

      var pricePerUnit = parent.attr('data-product-price');

      var Totalprice = newQuantity * pricePerUnit;

      parent.find('.total-price-for-product').text(Totalprice + '$');

      calculateTotalPrice();

    });

    //Get Calculate Total Price
    function calculateTotalPrice(){

      var totalPriceForAllProduct = 0;

      $('[data-product-info]').each(function(){

        var pricePerUnit = $(this).attr('data-product-price');

        var quantity = $(this).find('[data-product-quantity]').val();

        var totalPriceForProduct = quantity * pricePerUnit;

        totalPriceForAllProduct = totalPriceForAllProduct + totalPriceForProduct;

      });

      $('#total-price-for-all-product').text(totalPriceForAllProduct + 'دولار');

    }

    // Get Total Price All Products
    $('[data-remove-from-cart]').click(function(){
      $(this).parents('[data-product-info]').remove();
      calculateTotalPrice();
    });

    // Array Citites By Country
    var citiesByCountry = {
      sa:['الرياض','جدة'],
      eg:['القاهرة','الإسكندرية','السويس'],
      jo:['عمان','الزرقاء'],
      sy:['دمشق','حلب','حمص']
    }
    // Show Citites By Country Selected 
    $('#form-checkout select[name="country"]').change(function(){
      
      var country = $(this).val();

      var cities = citiesByCountry[country];

      $('#form-checkout select[name="city"]').empty();

      $('#form-checkout select[name="city"]').append(
        '<option disabled selected value="">إختر المدينة</option>'
      );

      cities.forEach(function(city){
        var newOption = $('<option></option>');
        newOption.text(city);
        newOption.val(city);
        $('#form-checkout select[name="city"]').append(newOption);
      });
     
      // 

    });

    // Toggle payment with CreditCard By User Selected
    $('#form-checkout input[name="payment_method"]').change(function(){

      var paymentMethod = $(this).val();

      if(paymentMethod === 'on_delivery'){
        $('#credit_card_info input').prop('disabled', true);
      } else {
        $('#credit_card_info input').prop('disabled', false);
      }
      $('#credit_card_info').toggle();
    });

    // Range Price
    $('#price-range').slider({
      range: true,
      min: 50,
      max: 1000,
      step: 5,
      values: [250,800],
      slide: function( event, ui){
        $('#price-min').text(ui.values[0]);
        $('#price-max').text(ui.values[1]);
      }
    });


  });