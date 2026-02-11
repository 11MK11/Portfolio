
<?php
require_once("testimonial.php");
        
    $sql = "SELECT * FROM dbproject";
    $result = $con->query($sql);	

?> 

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Webers</title>
    <link rel="icon" type="image/png" sizes="180x180" href="./assets/logo.png">
    <link rel="stylesheet" href="hstyle.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
</head>
<body>
<header>
    <nav class="navbar">
        <div class="nav-container">
            <a href="home.php" class="nav-logo"><img src="./assets/logo.png" alt="Your Logo"></a>
            <ul class="nav-menu" id="nav-menu">
                <li class="nav-item"><a href="#home1" class="nav-link">Home</a></li>
                <li class="nav-item"><a href="contact-us.html" class="nav-link">Contact Us</a></li>
                <li class="nav-item"><a href="services.html" class="nav-link">Get a Service</a></li>
            </ul>
            <div class="nav-icon" onclick="toggleMenu()">
                <i class="fas fa-bars"></i>
            </div>
        </div>
    </nav>
</header>
<div class="first" id="home1">
<section class="home">
<div class="home-content">
    <div class="text-container">
    <h3 style="color: red;">Software Engineer</h3>
    <h1>Hi, I'm <span>Malek Al-Qurany</span> From Webers</h1>
    <p>A diligent Software Engineer with a passion for crafting intuitive and dynamic user interfaces, leveraging the latest in technology trends to drive innovation and efficiency in software design. Keen on delivering high-quality, scalable, and impactful software solutions to meet and exceed user expectations.</p>
    <a href="malek.html" class="btn btn-secondary">SEE MORE</a>
    <div class="social-icons">
        <a href="https://www.linkedin.com/in/malek-qurany-71a826257/" class="linkedin"><i class="fab fa-linkedin-in"></i></a>
        <a href="tel:+962798887804" class="phone"><i class="fas fa-phone-alt m-1"></i></a>
        <a href="mailto:Mal20210083@std.psut.edu.jo" class="gmail"><i class="fas fa-envelope m-1"></i></a>
    </div>
</div>
    <img src="./assets/Malek.png" alt="Malek">
</div>
</section>
<hr>
<section class="home">
<div class="home-content">
    <div class="text-container">
    <h3 style="color: red;">Computer Scientist</h3>
    <h1>Hi, I'm <span>Omar Al-Sughair</span> From Webers</h1>
    <p>An enthusiastic Computer Scientist dedicated to advancing the field of computing with innovative research and development. Aims to build smarter, more intuitive technology by harnessing the potential of artificial intelligence and machine learning, thereby contributing to a future where technology and humanity evolve together for the betterment of society.</p>
    <a href="omar.html" class="btn btn-secondary">SEE MORE</a>
    <div class="social-icons">
        <a href="https://www.linkedin.com/" class="linkedin"><i class="fab fa-linkedin-in"></i></a>
        <a href="tel:+962785641926" class="phone"><i class="fas fa-phone-alt m-1"></i></a>
        <a href="mailto:Ome20210927@std.psut.edu.jo" class="gmail"><i class="fas fa-envelope m-1"></i></a>
    </div>
</div>
    <img src="./assets/Omar.png" alt="Omar">
</div>
</section>
<hr>
<section class="home">
<div class="home-content">
    <div class="text-container">
    <h3 style="color: red;">Software Engineer</h3>
    <h1>Hi, I'm <span>Ahmad Emad</span> From Webers</h1>
    <p>A committed Software Engineer focused on integrating cutting-edge technologies and creative problem-solving strategies to develop robust software solutions. With an eye for detail and a heart for innovation, strives to bridge the gap between technical possibilities and real-world applications, ensuring reliability, efficiency, and user-centric design in every project.</p>
    <a href="ahmad.html" class="btn btn-secondary">SEE MORE</a>
    <div class="social-icons">
        <a href="https://www.linkedin.com/in/ahmad-emad-7492391b6/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" class="linkedin"><i class="fab fa-linkedin-in"></i></a>
        <a href="tel:+962779954741" class="phone"><i class="fas fa-phone-alt m-1"></i></a>
        <a href="mailto:Ahm20221059@std.psut.edu.jo" class="gmail"><i class="fas fa-envelope m-1"></i></a>
    </div>
</div>
    <img src="./assets/Ahmad.png" alt="Ahmad">
</div>
</section>
<hr>
<section class="home">
    <div class="home-content">
        <div class="text-container">
        <h3 style="color: red;">Computer Scientist</h3>
        <h1>Hi, I'm <span>Mohammed Freitekh</span> From Webers</h1>
        <p>A forward-thinking Computer Scientist with a keen interest in leveraging computational power to drive innovation and efficiency. With a solid grounding in theoretical principles and a creative approach to problem-solving, aims to develop pioneering solutions that push the boundaries of technology, making significant contributions to the field and society.</p>
        <a href="mohammed.html" class="btn btn-secondary">SEE MORE</a>
        <div class="social-icons">
            <a href="https://www.linkedin.com/" class="linkedin"><i class="fab fa-linkedin-in"></i></a>
            <a href="tel:+962798078130" class="phone"><i class="fas fa-phone-alt m-1"></i></a>
            <a href="mailto:moh20180945@std.psut.edu.jo" class="gmail"><i class="fas fa-envelope m-1"></i></a>
        </div>
    </div>
        <img src="./assets/Mohammed.png" alt="Mohammed">
    </div>
    </section>
    <hr>
</div>

<br>
<h2 style="text-align: center;">What We Do?</h2>
<p class="subtitel-services">As many as 82% of customers are doing online research before they contact you about products or services. Is your website doing enough to turn those researchers into buyers? We are passionate about making beautiful websites to help you attract and retain customers for your small business.</p>
<div class="services" id="services">
    <a href="services.html" class="service-link">
    <div class="service">
        <span class="icon"><i class="fas fa-laptop-code"></i></span>
        <h2>WEB DESIGN</h2>
        <p><span>Elevate your digital presence with our custom web design services tailored to you!</span> We offer professional web design services at affordable rates to help your business attract more visitors and keep them on your site! More than beautiful design, we build websites with a complete strategy designed to turn your site visitors into customers.</p>
    </div>
</a>
<a href="services.html" class="service-link">
    <div class="service">
        <span class="icon"><i class="fas fa-pen-nib"></i></span>
        <h2>LOGO DESIGN</h2>
        <p><span>Unleash the power of a distinctive logo that speaks volumes about your brand's personality.</span> Our logo design service combines creativity, precision, and strategic thinking to craft a symbol that resonates with your target audience, leaving a lasting impression and fostering brand loyalty.</p>
    </div>
</a>
    <a href="services.html" class="service-link">
    <div class="service">
        <span class="icon"><i class="fas fa-bullhorn"></i></span>
        <h2>INTERNET MARKETING</h2>
        <p><span>Unlock the full potential of digital advertising on the world's leading platforms.</span> Our certified team specializes in setting up and managing Google, Facebook, and Bing campaigns with a focus on maximizing ROI. Trust us to navigate the complexities of ad bidding, audience targeting, and performance analysis, so you can stay ahead of the competition.</p>
    </div>
</a>
    <a href="services.html" class="service-link">
    <div class="service">
        <span class="icon"><i class="fas fa-search-dollar"></i></span>
        <h2>SEARCH ENGINE OPTIMIZATION</h2>
        <p><span>Secure your digital success with our results-driven SEO services designed to enhance your website's visibility and performance.</span> Whether you're a local business or a global enterprise, our strategic approach to search engine optimization focuses on delivering measurable results, higher rankings, and increased organic traffic.</p>
    </div>
</a>
    <a href="services.html" class="service-link">
    <div class="service">
        <span class="icon"><i class="fas fa-headset"></i></span>
        <h2>WEBSITE SUPPORT</h2>
        <p><span>Experience worry-free WordPress website management with our comprehensive support services.</span> Our team of WordPress experts is at your disposal for regular maintenance, plugin management, and troubleshooting, ensuring that your website remains secure, up-to-date, and fully functional around the clock.</p>
    </div>
    <a href="services.html" class="service-link">
    <div class="service">
        <span class="icon"><i class="fas fa-print"></i></span>
        <h2>PRINT DESIGN</h2>
        <p><span>Make a lasting impression with our professional print design services that breathe life on tangible mediums.</span> From eye-catching business cards to impactful signage and billboards that command attention, our design experts ensure your brand message stands out in the physical world.</p>
    </div>
</a>
</div>
<div class="portfolio-section"id="portfolio">
    <h2>Our Work Speaks for Itself</h2>
    <p>Our clients come from all industries and all over the country, with custom websites that showcase the quality of their business and their commitment to their customers.</p>
    <div class="portfolio-grid">
        <div class="portfolio-item">
            <a class="piteam" href="https://trianglepresentations.com/" target="_blank">
                <img src="./assets/p1.png" alt="Project 1" />
            </a>
        </div>
        <div class="portfolio-item">
            <a class="piteam" href="https://mymrsteamer.com/" target="_blank">
                <img src="./assets/p2.png" alt="Project 2" />
            </a>
        </div>
        <div class="portfolio-item">
            <a class="piteam" href="https://advancedflooringtechnology.com/" target="_blank">
                <img src="./assets/p3.png" alt="Project 3" />
            </a>
        </div>
        <div class="portfolio-item">
            <a class="piteam" href="https://triangleequitygroup.com/" target="_blank">
                <img src="./assets/p4.png" alt="Project 4" />
            </a>
        </div>
        <div class="portfolio-item">
            <a class="piteam" href="https://www.arimagnusson.com/" target="_blank">
                <img src="./assets/p5.png" alt="Project 5" />
            </a>
        </div>
        <div class="portfolio-item">
            <a class="piteam" href="https://barbaracooley.com/" target="_blank">
                <img src="./assets/p6.png" alt="Project 6" />
            </a>
        </div>
    </div>
</div>

<div class="massages">    
        <table id="messagesTable" border="1">
        <tr>
            <th>Name</th>
            <th>Message</th>
        </tr>
        <tr>
            <?php
            while ($row = $result->fetch_assoc() )
            {
            ?>
            <td><?php echo $row["FirstName"] ?></td>
            <td><?php echo $row["Messages"] ?></td>

            </tr>
            <?php
            }
            ?>
        
        </table>
</div>

<footer class="site-footer">
    <div class="container">
        <div class="footer-inner">
            <div class="footer-about">
                <h3>Webers</h3>
                <p>We are dedicated to providing innovative web solutions to clients worldwide. Our passion drives us to deliver exceptional designs and scalable development.</p>
            </div>
            <div class="footer-nav">
                <h3>Quick Links</h3>
                <ul class="footer-links">
                    <li><a href="#home1">Home</a></li>
                    <li><a href="contact-us.html">Contact Us</a></li>
                    <li><a href="services.html">Get a Service</a></li>
                </ul>
            </div>
            <div class="footer-contact">
                <h3>Contact Us</h3>
                <ul>
                    <li><a href="mailto:contact@webers.com" class="footer-link"><i class="fas fa-envelope"></i> contact@webers.com</a></li>
                    <li><a href="tel:+1234567890" class="footer-link"><i class="fas fa-phone"></i> +123 456 7890</a></li>
                    <li><a href="https://www.google.com/maps/search/?api=1&query=Business+Park,+Amman,+Jordan" target="_blank" class="footer-link"><i class="fas fa-map-marker-alt"></i>  Business Park, Amman, Jordan</a></li>
                </ul>
            </div>
        </div>
        <div class="footer-bottom">
            <p>©2024 Webers. All rights reserved.</p>
            <div class="social-icons">
                <a href="https://www.facebook.com/" class="facebook"><i class="fab fa-facebook-f"></i></a>
                <a href="https://www.linkedin.com/" class="linkedin"><i class="fab fa-linkedin-in"></i></a>
                <a href="https://www.instagram.com/" class="instagram"><i class="fab fa-instagram"></i></a>
            </div>
        </div>
    </div>
</footer>



<script>
    function toggleMenu() {
        const navMenu = document.getElementById('nav-menu');
        navMenu.classList.toggle('active');
    }
</script>    
</body>
</html>
<?php $con->close();?>