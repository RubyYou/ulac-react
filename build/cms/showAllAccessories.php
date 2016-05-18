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

   	  $allAcc = "SELECT * FROM acc_content";
   	  $allAccResult = mysqli_query($con, $allAcc);

   	 if($allAccResult){

   	  	echo "<table><thead><tr>";
   	  	echo "<td>ID</td><td>acc_Id</td><td>categories</td><td>thumbImg</td><td>en_summary</td><td>cn_summary</td>";
   	  	echo "<td>jp_summary</td><td>kr_summary</td><td>en_title</td><td>cn_title</td><td>jp_title</td>";
		   echo "<td>jp_title</td><td>en_description</td><td>cn_description</td><td>jp_description</td><td>kr_description</td>";
         echo "<td>en_details</td><td>cn_details</td><td>jp_details</td><td>kr_details</td>";
         echo "<td>icons</td><td>manual</td><td>carouselImg</td><td>videoLink</td>";
         echo "<td>actions</td>";
   	  	echo "</tr></thead>";

   	  	while($row = mysqli_fetch_array($allAccResult)){

            // get id and output all id's categories name
            $catQuery = "SELECT acc_cat_list.*, acc_categories.* FROM acc_cat_list INNER JOIN acc_categories ON acc_cat_list.cat_id = acc_categories.cat_id AND acc_cat_list.product_id = '".$row['id']."'";

            $allaccCat = mysqli_query($con, $catQuery);
            $name = null;

            if($allaccCat){
                  while($catList = mysqli_fetch_array($allaccCat)){
                     $name .= $catList['name']."<br/>";
                  }
            }


   	  		echo '<tr>';
   	  		echo '<td class=\'short\'>'.$row['id'].'</td>';
   	  		echo '<td class=\'short\'>'.$row['product_id'].'</td>';
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
            echo '<td class=\'long\'>'.$row['en_details'].'</td>';
            echo '<td class=\'long\'>'.$row['cn_details'].'</td>';
            echo '<td class=\'long\'>'.$row['jp_details'].'</td>';
            echo '<td class=\'long\'>'.$row['kr_details'].'</td>';
   	  		echo '<td class=\'mid\'>'.$row['icons'].'</td>';
   	  		echo '<td class=\'mid\'>'.$row['manual'].'</td>';
   	  		echo '<td class=\'long\'>'.$row['carouselImg'].'</td>';
   	  		echo '<td class=\'mid\'>'.$row['videoLink'].'</td>';
   	  		echo '<td><form action=\'showAllacc.php\' method=\'post\'>';
   	  		echo '<input type=\'hidden\' name=\'delete_id\' value=\''.$row['id'].'\'/>';
   	  		echo '<button type="submit" name="delete">DELETE</button></form>';
   	  		echo '<a href=\'editAcc.php?id='.$row['acc_id'].'\' target="_blank">UPDATE</a></td>';
   	  		echo '</tr>';
    	}
    	echo "</table>";
   	  }


      if(isset($_POST['delete'])) {
     	 
       $deleteItemCat = "DELETE FROM acc_cat_list WHERE product_id='".$_POST['delete_id']."'";

     	 $deleteItem = "DELETE FROM acc_content WHERE id='".$_POST['delete_id']."'";

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