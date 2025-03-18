
gsap.registerPlugin(ScrollToPlugin)

document.addEventListener("DOMContentLoaded", (event) => {
  
	//    FRAMEWORK
	const d = (element_query_selector) => document.querySelector(element_query_selector)
	const dl = (element_query_selector) => document.querySelectorAll(element_query_selector)

	const log = (what) => {console.log(what)}
	 
	//    nabar width for scrolling on nav click
	const nav = d("nav")
	const navbarHeight = nav.offsetHeight


	document.querySelectorAll("nav button.scroll-to").forEach((btn, index) => {
	    btn.addEventListener("click", () => {
	      gsap.to(window, {duration: 1, scrollTo:{y:"#section" + (index + 1), offsetY: navbarHeight }});
	    });
	  });

	// split text stagger animatino
	
	const myText = new SplitType("#website_title > h2");

	gsap.to(".char", {
		y: 0,
		opacity:1,
		stagger: 0.05,
		delay: 0.2,
		duration: 0.1,
	});

	gsap.to('.box-reveal', {
	  duration: 1.5,
	  opacity:1,
	  x: 0,
	  transformOrigin: "50% 50%",
	  //rotateY: 360,
	  ease: "back.out(1.7)",
	  stagger: 0.3,
	});


	let timeLast = Date.now()

	document.addEventListener("scroll", (event) => {
		
		log(window.scrollY + navbarHeight)


  	});

	const scrollToBtns = dl("nav button.scroll-to")
	const sections = dl(".content h2")

	log(scrollToBtns)
	log(sections)


	// all buttons 
	// scroll position > of top ,  < of bottom
  
  
  
  
  
});



