/**
 *  Wrapper for DFP api.
 *  @requires gpt.js to be loaded.
 */
var Harmony = (function () {
    var adUnitCode = '/11347122/dev-test';
    var lastId;

    return {
        display: function (slots) {
            if (slots) {
                console.log('Displaying new slots.');
                slots.forEach(function (slot) {
                    console.log('- display()');
                    googletag.display(slot.divId);
                });
                console.log('- refresh()');
                googletag.pubads().refresh(slots);
            } else {
                console.log('Displaying ads ending at ' + lastId);
                googletag.display(lastId);
            }
        },
        newSlot: function (name, sizes, mapping) {
            mapping = mapping || [];
            var id = 'div-gpt-ad-' + name;
            var slot = googletag.defineSlot(adUnitCode, sizes, id);
            slot.divId = id;
            lastId = id;
            slot.setTargeting('ad_slot', name);
            slot.defineSizeMapping(mapping);
            slot.addService(googletag.pubads());
            googletag.pubads().addEventListener(
                'slotRenderEnded',
                function (event) {
                    if (event.slot === slot) {
                        console.log('slotRenderEnded for ' + name);
                    }
                }
            );

            console.log('Created slot: ' + name);
            return slot;
        }
    };
}());
