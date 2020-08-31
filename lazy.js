// Gets template content and clone it into target

function useTemplate(templateParent,templateMediaSize,callback){
    templateParent.appendChild(
    templateParent.querySelector(templateMediaSize)
    .content.cloneNode(true))

    return callback();
}


function lazyLoad(templateParent,templateMediaSize){

    // Initiate a new IO object
    const lazyLoadIO = new IntersectionObserver((e) =>  {
      let i = 0;
      e.forEach( (e) => {
        console.log(e.intersectionRatio);
        if( e.intersectionRatio > 0 ) {
          // Unobserve
          lazyLoadIO.unobserve(e.target);
            useTemplate(e.target,templateMediaSize);
        }
      });
    }, {
      // Use positive margin to load the images before they come into view
      rootMargin: "0px 0px 150px 0px", 
      //threshold: [0, 0.25, 0.5, 0.75]
    });

    // Loop through all figures
    let figures = document.querySelectorAll(templateParent);
    if(figures.length) {
      figures.forEach( (e) => {
        lazyLoadIO.observe(e);
      });
    }

};

// Calling functions

  //lazy images 
    lazyLoad('figure.lazy','template.desktop');

  // fullbanner 
    useTemplate(document.querySelector('div.fullbanner'),'template.mobile',
      function(){
        $('.fullbanner').slick({
          dots: true,
          slide: 'img',
          infinite: true,
          speed: 500,
          fade: true,
          cssEase: 'linear'
        });
    });

