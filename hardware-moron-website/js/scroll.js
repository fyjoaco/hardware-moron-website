// scroll.js - Versión mejorada con corrección para el menú mobile
$(document).ready(function() {
  // 1. Asegurar estado inicial correcto del botón hamburguesa
  $('.navbar-toggler').addClass('collapsed');
  
  // 2. Scroll suave para enlaces del menú
  $('.navbar-nav .nav-link').on('click', function(e) {
    e.preventDefault();
    
    // Cerrar el menú mobile al hacer clic en un enlace
    if ($('.navbar-toggler').is(':visible')) {
      $('#navbarSupportedContent').collapse('hide');
      $('.navbar-toggler').addClass('collapsed');
    }
    
    // Mapeo de secciones
    const targetClass = {
      "Inicio": "slider_section",
      "Nosotros": "about_section", 
      "Servicios": "service_section",
      "Contáctanos": "contact-footer"
    }[$(this).text().trim().replace(' (current)', '')];
    
    if (targetClass) {
      const navbarHeight = $('.custom_nav-container').outerHeight() || 80;
      const targetPosition = $(`.${targetClass}`).offset().top - navbarHeight;
      
      $('html, body').stop().animate({
        scrollTop: targetPosition
      }, 800);
      
      // Actualizar ítem activo
      $('.nav-item').removeClass('active');
      $(this).parent().addClass('active');
    }
  });

  // 3. Resetear el botón al cerrar el menú
  $('#navbarSupportedContent').on('hidden.bs.collapse', function() {
    $('.navbar-toggler').addClass('collapsed');
  });
}); 