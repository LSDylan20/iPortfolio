/**
* Template Name: iPortfolio
* Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
* Updated: Mar 17 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
    "use strict";
  
    // Selector helper function
    const select = (el, all = false) => {
      el = el.trim()
      return all ? [...document.querySelectorAll(el)] : document.querySelector(el);
    }
  
    // Event listener helper function
    const on = (type, el, listener, all = false) => {
      let elements = select(el, all);
      if (elements) {
        if (all) {
          elements.forEach(e => e.addEventListener(type, listener));
        } else {
          elements.addEventListener(type, listener);
        }
      }
    }
  
    // Navbar links active state on scroll
    const navbarlinksActive = () => {
      let position = window.scrollY + 200;
      select('#navbar .scrollto', true).forEach(navbarlink => {
        if (!navbarlink.hash) return;
        let section = select(navbarlink.hash);
        if (!section) return;
        navbarlink.classList.toggle('active', position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight));
      });
    }
    window.addEventListener('load', navbarlinksActive);
    window.addEventListener('scroll', navbarlinksActive);
  
    // Scrolls to an element with header offset
    const scrollto = (el) => {
      if (select(el)) {
        let elementPos = select(el).offsetTop;
        window.scrollTo({
          top: elementPos - document.querySelector('#navbar').offsetHeight,
          behavior: 'smooth'
        });
      }
    }
  
    // Toggle mobile navigation
    on('click', '.mobile-nav-toggle', function() {
      let body = document.body;
      body.classList.toggle('mobile-nav-active');
      this.classList.toggle('bi-list');
      this.classList.toggle('bi-x');
    });
  
    // Scroll with offset on links with a class name .scrollto
    on('click', '.scrollto', function(e) {
      if (this.hash) {
        e.preventDefault();
        document.body.classList.remove('mobile-nav-active');
        select('.mobile-nav-toggle').classList.toggle('bi-list', true);
        select('.mobile-nav-toggle').classList.toggle('bi-x', false);
        scrollto(this.hash);
      }
    }, true);
  
    // AJAX contact form submission
    document.addEventListener('DOMContentLoaded', function () {
      const form = select('#contact-form');
      if (form) {
        form.addEventListener('submit', function (e) {
          e.preventDefault();
          const formData = new FormData(this);
          fetch('forms/contact.php', {
            method: 'POST',
            body: formData
          })
          .then(response => response.text())
          .then(data => {
            const messageContainer = data.trim() === 'success' ? select('.sent-message') : select('.error-message');
            messageContainer.textContent = data.trim() === 'success' ? 'Your message has been sent. Thank you!' : 'Oops! There was a problem sending your message. Please try again later.';
            messageContainer.style.display = 'block';
            setTimeout(() => { messageContainer.style.display = 'none'; }, 5000);
            if (data.trim() === 'success') {
              form.reset();
            }
          })
          .catch(() => {
            select('.error-message').textContent = 'Oops! There was a problem with our server. Please try again later.';
            select('.error-message').style.display = 'block';
            setTimeout(() => { select('.error-message')..style.display = 'none'; }, 5000);
          });
        });
      }
    });
  })();
  