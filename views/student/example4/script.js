var editor;
var config = {
    content: [{
      type: 'stack', // Stack
      content: [
        {
          type:'component',
          componentName: 'example',
          componentState: { text: 'Component 1' }
        }
      ]
    }]
  };
  
var myLayout = new GoldenLayout( config, $( '.position' ) );
/*
myLayout.registerComponent( 'example', function( container, state ){
  container.getElement().html( '<h2>' + state.text + '</h2>' );
  console.log(container.getElement()[0]);
});
*/
require( ['vs/editor/editor.main'], () => {

    myLayout.registerComponent( 'example', function( container, state ){
      //ontainer.getElement().html( '<h2>' + state.text + '</h2>' );
      //var c = function() { return Math.floor( Math.random() * 255 ).toString( 16 ); };
      //container.getElement().css( 'background-color', '#' + c() + c() + c() );

    editor = monaco.editor.create(container.getElement()[ 0 ] /* Root */, {
          automaticLayout: true,
          theme: "vs-dark",
          scrollBeyondLastLine: false,
          readOnly: state.readOnly,
          language: "plaintext",
          minimap: {
              enabled: false
        }
    });
  });

  myLayout.init();
});
  


$(window).resize(()=> {
  myLayout.updateSize();
});

/* Activate Droppeddown */
$('select.dropdown')
  .dropdown({
    allowAdditions: true
});