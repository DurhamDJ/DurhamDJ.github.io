function checkScales() {
    $('.demo-widget').map((_, parent) => {
        let height = 0, width = 0;

        $(parent).children('iframe').map((_, frame) => {
            $(frame).css('transform', `scale(${Math.min($(parent).parent().width()/$(frame).width(), 0.5)})`);
            height += frame.getBoundingClientRect().height;
            width = Math.max(width, frame.getBoundingClientRect(). width);
        });
        
        $(parent).height(height);
        $(parent).width(width);
    });
}
window.onresize = checkScales;

checkScales();