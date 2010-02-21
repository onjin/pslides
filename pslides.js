/*
 * PSlided - page slides
 * author: Marek Wywiał <onjinx@gmail.com> 
 *
simple usage:

html:
 <div id="overcontent">
    <div id="content">
        <div class="iter_element">element</div>
        <div class="iter_element">element</div>
    </div>
 </div>
 <div id="pslides_navigation">
     <a href="#" class="prev" onclick="PSlides.prev()">&laquo;</a>
     <a href="#" class="next" onclick="PSlides.next()">&raquo;</a>
 </div>

<script type="text/javascript">
MochiKit.DOM.addLoadEvent(function() {
    PSlides.init('#content .iter_element', 1, 800, 590);
});
</script>

init params:
 * '#content .iter_element' - expression for MochiKit.Selector.$$() to search elements to scrollup
 * 1 - count of elements to display on one page
 * 800 - slide width to clip and scroll
 * 590 - slide height to clip and scroll
*/


PSlides = {
    active: false,
    locked: false,
    init: function(slide_element_search_exp, elements_on_slide_count, width, height) {
        this.slide_element_search_exp = slide_element_search_exp;
        this.elements_on_slide_count = elements_on_slide_count;

        elements = MochiKit.Selector.$$( this.slide_element_search_exp );
        if (elements.length > 0 ) {

            // attributes
            this.active = true;
            this.pages = Math.ceil(elements.length / this.elements_on_slide_count);
            this.current_page = 1;
            this.position = 0;
            this.width = width;
            this.height = height;

            //MochiKit.Logging.log('creating slides' + this.pages);

            // elements
            this.content = MochiKit.Selector.$$('#content')[0];
            this.overcontent = MochiKit.Selector.$$('#overcontent')[0];
            this.navigation = MochiKit.Selector.$$('#pslides_navigation')[0];

            MochiKit.DOM.makeClipping( this.overcontent );
            MochiKit.DOM.setElementDimensions( this.overcontent, { 'w': this.width, 'h': this.height} );

            MochiKit.DOM.makePositioned( this.content );
            if (this.pages > 1) {
                this.show_navigation();
            }
        } 
    },
    next: function() {
        if ( this.locked == true ) return;
        if (this.current_page == this.pages) {
            move_to = (this.pages -1) * this.height;
            this.current_page = 1;
        } else {
            move_to = -this.height;
            this.current_page += 1;

        }
        this.move(move_to);
    },
    prev: function() {
        if ( this.locked == true ) return;
        if (this.current_page == 1) {
            move_to = -( (this.pages -1 ) * this.height);
            this.current_page = this.pages;
        } else {
            move_to = this.height;
            this.current_page -= 1;
        }
        this.move(move_to);
    },
    move: function(position) {
        if ( this.locked == true ) return;
        MochiKit.Visual.Sequence([
            //MochiKit.Visual.fade(this.content, { 'sync' : true }),
            MochiKit.Visual.Move(this.content, {'x': 0, 'y': position, 'sync': true}),
            //MochiKit.Visual.appear(this.content, { 'sync': true }),
            ], {
            beforeStart: function() { PSlides.lock(); },
            afterFinish: function() { PSlides.unlock(); },
        });
    },
    show_navigation: function() {
        if ( this.locked == true ) return;
         /*
        if (this.pages == 1) {
            MochiKit.Style.hideElement( MochiKit.Selector.$$('#pslides_navigation .prev')[0] );
            MochiKit.Style.hideElement( MochiKit.Selector.$$('#pslides_navigation .next')[0] );
        }
        */

        MochiKit.Visual.Sequence([
            MochiKit.Visual.appear(this.navigation, { 'sync': true }),
            MochiKit.Visual.Highlight(this.navigation, { 'sync': true }),
        ]);
    },
    hide_navigation: function() {
        if ( this.locked == true ) return;
        MochiKit.Visual.Sequence([
            MochiKit.Visual.fade(this.navigation, { 'sync': true }),
        ]);
    },
    lock: function () {
        this.locked = true;
    },
    unlock: function () {
        this.locked = false;
    },
}

