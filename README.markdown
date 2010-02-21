# PSlides - javascript page slides

Simple javascript slides with MochiKit. Just render your content and run PSlides to make auto slides

## Requirements
 * MochiKit javascript library http://www.mochikit.com/

## API
 * PSlides.init(slide_element_search_exp, elements_on_slide_count, slide_width, slide_height) - initialize PSlides
   * slide_element_search_exp - expression for MochiKit.Selector.$$() to search your slide elements
   * elements_on_slide_count - you can paste 1 or more elements on one slide
   * slide_width - width of the slide (clipped #content)
   * slide_height - height of the slide (clipped #content)

 * PSlides.next() - animate to next slide; last slide will rewind to first slide
 * PSlides.prev() - animate to prev slide; first slide will rewind to last slide

 * PSlides.show_navigation() - show #pslides_navigation element - usualy navigation for pslides
 * PSlides.hide_navigation() - hide #pslides_navigation element - usualy navigation for pslides

 * PSlides.move(position) - move slides #content to given position - used by 'next/prev'
 * PSlides.lock() - lock PSlides, previous functions will not work - used by 'move' 
 * PSlides.unlock() - unlock PSlides, previous functions will work - used by 'move'

## Example
 * look at demo.html in repository

## Todo
 * remove hardcoded #overcontent, #content and #pslides_navigation from code - to use multiple slides on one page
