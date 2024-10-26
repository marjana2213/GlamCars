class Utility {
	RandomInt(min, max) {
  		return Math.floor(Math.random() * (max - min + 1) + min);
	}

	fomatToArraySQL(str) {;
		let arr = str.split(',');
		
		let arr_sql = '';
   		for(let i = 0; i < arr.length; i++) {
            arr_sql += '\'' + arr[i] + '\', ';
    	}
    	arr_sql = arr_sql.substring(0, arr_sql.length - 2);

    	return arr_sql;
	}
}

module.exports = new Utility();