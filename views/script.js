var config = {
    content: [{
      type: 'stack', // Stack
      content: [
        {
          type:'component',
          componentName: 'example',
          componentState: { text: 'Component 1' }
        },
        {
          type:'component',
          componentName: 'example',
          componentState: { text: 'Component 2' }
        },
        {
          type:'component',
          componentName: 'example',
          componentState: { text: 'Component 3' }
        }
      ]
    }]
  };
  
  var myLayout = new GoldenLayout( config, $( '.position' ) );
  
  myLayout.registerComponent( 'example', function( container, state ){
    container.getElement().html( '<h2>' + state.text + '</h2>' );

    var c = function() { return Math.floor( Math.random() * 255 ).toString( 16 ); };

    container.getElement().css( 'background-color', '#' + c() + c() + c() );
  });
  
  myLayout.init();
  
  $(window).resize(()=> {
    myLayout.updateSize();
  });