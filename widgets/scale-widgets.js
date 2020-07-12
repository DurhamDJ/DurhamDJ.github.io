function checkScales() {
    $('.demo-widget').map((_, parent) => {
        let height = 0;

        $(parent).children('iframe').map((_, frame) => {
            $(frame).css('transform', `scale(${Math.min($(parent).width()/$(frame).width(), 1.0)})`);
            height += frame.getBoundingClientRect().height;
        });
        
        $(parent).height(height);
    });
}
window.onresize = checkScales;

checkScales();