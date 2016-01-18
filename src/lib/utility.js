import React from 'react';

class Utility extends React.Component {

	ObjectSize (obj) {
	    var size = 0, key;
	    for (key in obj) {
	        if (obj.hasOwnProperty(key)) size++;
	    }
	    return size;
	}
}

export default Utility;