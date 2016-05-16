<html>
   
   <head>
   	  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <title> here</title>
   </head>
   <style> 
   table td{ border:1px solid #c6c6c6; 
   			 word-wrap: break-word;
   			 vertical-align: top;
   			 padding:5px;
   			}
   	table thead{ background:#c6c6c6; color:white; }
   		td.short{ max-width:50px; }
   		td.mid{ max-width:150px; min-width:150px;}
   		td.long{ max-width:300px;  min-width:300px;}
   </style>
   <body>

   <?php
   	  // output all the data into table
   	  require_once('serverConfig.php');

   	  $allLock = "SELECT * FROM lock_content";
   	  $allLockResult = mysqli_query($con, $allLock);

   	 if($allLockResult){

   	  	echo "<table><thead><tr>";
   	  	echo "<td>ID</td><td>lock_Id</td><td>categories</td><td>thumbImg</td><td>en_summary</td><td>cn_summary</td>";
   	  	echo "<td>jp_summary</td><td>kr_summary</td><td>en_title</td><td>cn_title</td><td>jp_title</td>";
		   echo "<td>jp_title</td><td>en_description</td><td>cn_description</td><td>jp_description</td><td>kr_description</td>";
         echo "<td>security</td><td>icons</td><td>manual</td><td>carouselImg</td><td>videoLink</td>";
         echo "<td>actions</td>";
   	  	echo "</tr></thead>";

   	  	while($row = mysqli_fetch_array($allLockResult)){

            // get id and output all id's categories name
            $catQuery = "SELECT lock_cat_list.*, lock_categories.* FROM lock_cat_list INNER JOIN lock_categories ON lock_cat_list.cat_id = lock_categories.cat_id AND lock_cat_list.product_id = '".$row['id']."'";

            $allLockCat = mysqli_query($con, $catQuery);
            $name = null;

            if($allLockCat){
                  while($catList = mysqli_fetch_array($allLockCat)){
                     $name .= $catList['name']."<br/>";
                  }
            }


   	  		echo '<tr>';
   	  		echo '<td class=\'short\'>'.$row['id'].'</td>';
   	  		echo '<td class=\'short\'>'.$row['lock_id'].'</td>';
            echo '<td class=\'short\'>'.$name.'</td>';
   	  		echo '<td class=\'mid\'>'.$row['thumbImg'].'</td>';
   	  		echo '<td class=\'mid\'>'.$row['en_summary'].'</td>';
   	  		echo '<td class=\'mid\'>'.$row['cn_summary'].'</td>';
   	  		echo '<td class=\'mid\'>'.$row['jp_summary'].'</td>';
   	  		echo '<td class=\'mid\'>'.$row['kr_summary'].'</td>';
   	  		echo '<td class=\'mid\'>'.$row['en_title'].'</td>';
   	  		echo '<td class=\'mid\'>'.$row['cn_title'].'</td>';
   	  		echo '<td class=\'mid\'>'.$row['jp_title'].'</td>';
   	  		echo '<td class=\'mid\'>'.$row['kr_title'].'</td>';
   	  		echo '<td class=\'long\'>'.$row['en_description'].'</td>';
   	  		echo '<td class=\'long\'>'.$row['cn_description'].'</td>';
   	  		echo '<td class=\'long\'>'.$row['jp_description'].'</td>';
   	  		echo '<td class=\'long\'>'.$row['kr_description'].'</td>';
   	  		echo '<td class=\'short\'>'.$row['security'].'</td>';
   	  		echo '<td class=\'mid\'>'.$row['icons'].'</td>';
   	  		echo '<td class=\'mid\'>'.$row['manual'].'</td>';
   	  		echo '<td class=\'long\'>'.$row['carouselImg'].'</td>';
   	  		echo '<td class=\'mid\'>'.$row['videoLink'].'</td>';
   	  		echo '<td><form action=\'showAllLock.php\' method=\'post\'>';
   	  		echo '<input type=\'hidden\' name=\'delete_id\' value=\''.$row['id'].'\'/>';
   	  		echo '<button type="submit" name="delete">DELETE</button></form>';
   	  		echo '<a href=\'editLock.php?id='.$row['lock_id'].'\' target="_blank">UPDATE</a></td>';
   	  		echo '</tr>';
    	}
    	echo "</table>";
   	  }


      if(isset($_POST['delete'])) {
     	 
       $deleteItemCat = "DELETE FROM lock_cat_list WHERE product_id='".$_POST['delete_id']."'";

       $deleteItem = "DELETE FROM lock_content WHERE id='".$_POST['delete_id']."'";

         $deleteItemCatResult = mysqli_query($con, $deleteItemCat);
         
          
         if( !$deleteItemCatResult ) {
         
            die('Could not delete data categories: ' . mysqli_error());
         
         }else{

            $deletedResult = mysqli_query($con, $deleteItem);
         }

         if(!$deletedResult){
         
            die('Could not delete data: ' . mysqli_error());
         
         }else{

            echo "delete product successfully.";
            header('Location: '.$_SERVER['REQUEST_URI']);

         }
      }

      $con->close();       
    
    ?>

   </body>

</html>