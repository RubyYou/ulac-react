<html>
   
   <head>
      <title>Add New Record in ULAC CONTENT</title>
   </head>
   
   <body>

<?php
         if(isset($_POST['add'])) {
         	echo 'post happen';
          	$servername = "localhost";
			$username = "root";
			$password = "root";
			$dbname = "ULAC";

			$con = mysqli_connect($servername,$username,$password,$dbname);
            
            header('Content-Type: text/html;charset=utf-8');

            if( function_exists('mysqli_set_charset') ){
			    mysqli_set_charset($con, 'utf8');
			    echo ' set charaset utf8';

			}else{
			    mysqli_query("SET NAMES 'utf8'", $con);
			    echo 'set name';
			}

            if(! $con ) {
               die('Could not connect: ' . mysql_error());
            }
            
            $lock_id = $_POST['lock_id'];
            $thumbImg = $_POST['thumbImg'];
            $en_summary = $_POST['en_summary'];
            $cn_summary = $_POST['cn_summary'];
            $jp_summary = $_POST['jp_summary'];
            $kr_summary = $_POST['kr_summary'];
            $en_title = $_POST['en_title'];
            $cn_title = $_POST['cn_title'];
            $jp_title = $_POST['jp_title'];
            $kr_title = $_POST['kr_title'];
            $en_description = $_POST['en_description'];
            $cn_description = $_POST['cn_description'];
            $jp_description = $_POST['jp_description'];
            $kr_description = $_POST['kr_description'];
            $spec = $_POST['spec'];
            $weight = $_POST['weight'];
            $icons = $_POST['icons'];
            $manual = $_POST['manual'];
            $videoLink = $_POST['videoLink'];

            echo $lock_id." / ".$kr_summary." / ".$cn_summary." / ".$jp_summary;

            $sql = "INSERT INTO lock_content". "(lock_id, thumbImg, en_summary, 
               cn_summary, jp_summary, kr_summary, en_title, cn_title, jp_title, kr_title,
               en_description, cn_description, jp_description, kr_description, spec, weight, 
               icons, manual, videoLink) "."VALUES('$lock_id','$thumbImg','$en_summary', 
               '$cn_summary', '$jp_summary', '$kr_summary', '$en_title', '$cn_title', 
               '$jp_title', '$kr_title', '$en_description', '$cn_description', 
               '$jp_description', '$kr_description', '$spec', '$weight', 
               '$icons', '$manual', '$videoLink')";

            $retval = mysqli_query( $con, $sql);
            
            if(! $retval ) {
               die('Could not enter data: ' . mysqli_error());
            }
            
            echo "Entered data successfully\n";
            
            mysql_close($con);
         }else {
    ?>

	<form action="dataInput.php" method="post">
		 <table width = "400" border = "0" cellspacing = "1" 
             cellpadding = "2">
          
             <tr>
                <td width = "100">Lock_ID</td>
                <td><input name = "lock_id" type = "text" 
                   id = "lock_id">
                </td>
             </tr>
          
             <tr>
                <td width = "100">thumbImg</td>
                <td><textarea name = "thumbImg" type = "text" 
                   id = "thumbImg"></textarea></td>
             </tr>
          
             <tr>
                <td width = "100">en_summary</td>
                <td><textarea name = "en_summary" type = "text" 
                   id = "en_summary"></textarea></td>
             </tr>

             <tr>
                <td width = "100">cn_summary</td>
                <td><textarea name = "cn_summary" type = "text" 
                   id = "cn_summary"></textarea></td>
             </tr>
             <tr>
                <td width = "100">jp_summary</td>
                <td><textarea name = "jp_summary" type = "text" 
                   id = "jp_summary"></textarea></td>
             </tr>
             <tr>
                <td width = "100">kr_summary</td>
                <td><textarea name = "kr_summary" type = "text" 
                   id = "kr_summary"></textarea></td>
             </tr>

             <tr>
                <td width = "100">en_title</td>
                <td><input name = "en_title" type = "text" 
                   id = "en_title"></td>
             </tr>

             <tr>
                <td width = "100">cn_title</td>
                <td><input name = "cn_title" type = "text" 
                   id = "cn_title"></td>
             </tr>

             <tr>
                <td width = "100">jp_title</td>
                <td><input name = "jp_title" type = "text" 
                   id = "jp_title"></td>
             </tr>

             <tr>
                <td width = "100">kr_title</td>
                <td><input name = "kr_title" type = "text" 
                   id = "kr_title"></td>
             </tr>

             <tr>
                <td width = "100">en_description</td>
                <td><textarea name = "en_description" type = "text" 
                   id = "en_description"></textarea></td>
             </tr>

             <tr>
                <td width = "100">cn_description</td>
                <td><textarea name="cn_description" type = "text" 
                   id = "cn_description"></textarea></td>
             </tr>

             <tr>
                <td width = "100">jp_description</td>
                <td><textarea name = "jp_description" type = "text" 
                   id = "jp_description"></textarea></td>
             </tr>

             <tr>
                <td width = "100">kr_description</td>
                <td><textarea name = "kr_description" type = "text" 
                   id = "kr_description"></textarea></td>
             </tr>

             <tr>
                <td width = "100">spec</td>
                <td><input name = "spec" type = "text" 
                   id = "spec"></td>
             </tr>

             <tr>
                <td width = "100">weight</td>
                <td><input name = "weight" type = "text" 
                   id = "weight"></td>
             </tr>
          	<tr>
                <td width = "100">icons</td>
                <td><textarea name = "icons" type = "text" 
                   id = "icons"></textarea></td>
             </tr>

             <tr>
                <td width = "100">carouselImg</td>
                <td><textarea name = "carouselImg" type = "text" 
                   id = "carouselImg"></textarea></td>
             </tr>

             <tr>
                <td width = "100">manualLink</td>
                <td><textarea name = "manual" type = "text" 
                   id = "manual"></textarea></td>
             </tr>
             <tr>
                <td width = "100">videoEmbedLink</td>
                <td><textarea name = "videoLink" type = "text" 
                   id = "videoLink"></textarea></td>
             </tr>
             <tr>
                <td width = "100"> </td>
                <td>
                   <input name = "add" type = "submit" id = "add" 
                      value = "add new Item">
                </td>
             </tr>
          
          </table>
	</form>

	        <?php
         }
      ?>
   </body>
</html>