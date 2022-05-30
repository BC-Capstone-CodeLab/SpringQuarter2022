var config = {
    content: [{
      type: 'stack',
      content: []
    }]
  };

  
  var myLayout = new GoldenLayout( config );
  
  myLayout.registerComponent( 'studentIDE', function( container, state ){
    var c = function() { return Math.floor( Math.random() * 255 ).toString( 16 ); };

    container.getElement().css( 'background-color', '#' + c() + c() + c() );
    container.getElement().html( '<h2>' + state.text + '</h2>');

  });
  
  myLayout.init();

  var createNewTabWithRow = function(number) {

    if ( number === 0 ) return; 

    var component = {
        type: 'component',
        componentName: 'studentIDE',
        componentState: { text: 'NEW INSERTION' }
    };

    var content = new Array( number );
    content.fill( component );

    var newItemConfig = {
        type: 'column',
        content: [{
            type: 'row',
            content: content
        }]
    };
  
    myLayout.root.contentItems[ 0 ].addChild( newItemConfig );
  };

  var createRowAndAddComponent = function ( objectRef , number = 1 ){

    if ( number === 0 ) return;

    var component = {
        type: 'component',
        componentName: 'studentIDE',
        componentState: { text: 'NEW INSERTION WITH TAB' }
    };   

    var content = new Array( number ); 
    content.fill( component );

    var newItemConfig = {
        type: 'row',
        content: content
    };

    objectRef.addChild( newItemConfig );

    return true;
  };

  var addOneRowInTab = function (num_childRow) {

    if (num_childRow === 0 ) return;

    let added = false;

    myLayout.root.getItemsByType('column').forEach(columnType => {
        if (columnType.contentItems.length < 2)
        {
            added = createRowAndAddComponent(columnType, num_childRow);
            return;
        }

    });

    if (!added) createNewTabWithRow(num_childRow);
  };
  
  //setTimeout(() => createRowAddTab.apply(this, [2]), 2000);
  //setTimeout(() => createRowAddTab.apply(this, [2]), 4000);
  setTimeout(() => createNewTabWithRow.apply(null, [2]), 2000);
  setTimeout(() => addOneRowInTab.apply(null, [2]), 3000);
  setTimeout(() => addOneRowInTab.apply(null, [2]), 4000);
  