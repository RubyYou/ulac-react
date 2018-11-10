<html>
   
   <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <title>Edit a old Record in ULAC CONTENT</title>
   </head>
   
   <body>

<?php


if(isset($_GET['id'])){
  
  $lock_id=$_GET['id'];

  require_once('serverConfig.php');

  //echo $id;

  if(isset($_POST['update'])){

    $id_p = $_POST['id_p'];
    $lock_id_p = $_POST['lock_id_p'];
    $thumbImg_p = $_POST['thumbImg_p'];
    $en_summary_p = $_POST['en_summary_p'];
    $cn_summary_p = $_POST['cn_summary_p'];
    $jp_summary_p = $_POST['jp_summary_p'];
    $kr_summary_p = $_POST['kr_summary_p'];
    $en_title_p = $_POST['en_title_p'];
    $cn_title_p = $_POST['cn_title_p'];
    $jp_title_p = $_POST['jp_title_p'];
    $kr_title_p = $_POST['kr_title_p'];
    $en_description_p = $_POST['en_description_p'];
    $cn_description_p = $_POST['cn_description_p'];
    $jp_description_p = $_POST['jp_description_p'];
    $kr_description_p = $_POST['kr_description_p'];
    $spec_p = $_POST['spec_p'];
    $weight_p = $_POST['weight_p'];
    $security_p = $_POST['security_p'];
    $icons_p = $_POST['icons_p'];
    $colors_p = $_POST['colors_p'];
    $manual_p = $_POST['manual_p'];
    $carouselImg_p = $_POST['carouselImg_p'];
    $videoLink_p = $_POST['videoLink_p'];
	$show_p = intval($_POST['show_p']);
    $lock_cat_p = $_POST['lock_cat'];

    echo $lock_cat_p."lock_cat_p";

    $updateSql = "UPDATE lock_content SET lock_id = '$lock_id_p',
                  thumbImg = '$thumbImg_p', en_summary = '$en_summary_p',
                  cn_summary = '$cn_summary_p', jp_summary = '$jp_summary_p',
                  kr_summary = '$kr_summary_p', en_title = '$en_title_p',
                  cn_title = '$cn_title_p', jp_title = '$jp_title_p', 
                  kr_title = '$kr_title_p', cn_description = '$cn_description_p',
                  en_description = '$en_description_p', jp_description = '$jp_description_p',
                  kr_description = '$kr_description_p', spec = '$spec_p', security = '$security_p',
                  weight = '$weight_p', icons = '$icons_p', colors = '$colors_p', manual = '$manual_p', 
                  carouselImg = '$carouselImg_p', videoLink = '$videoLink_p', showInfo = '$show_p'
                  WHERE id = '$id_p'";

    $deleteCatSql = "DELETE FROM lock_cat_list WHERE product_id='".$id_p."'";
    
    $delete = mysqli_query($con, $deleteCatSql);

    if($delete){  
      foreach($lock_cat_p as $catName){
        $insertCatSql = "INSERT INTO lock_cat_list (cat_id, product_id) VALUES ('".$catName."', '".$id_p."')";
        mysqli_query($con, $insertCatSql);
      }

    }else{
      die('Could not enter category: ' . mysqli_error());
    }

    $update = mysqli_query($con, $updateSql);
    
    if(!$update ) {
       die('Could not enter data: ' . mysqli_error());
    }

    if($updated){
      $msg="Successfully Updated!!";
    }
  }

    $query="SELECT * FROM lock_content WHERE lock_id='".$lock_id."'";
    
    $result = mysqli_query($con, $query);

    while($row = mysqli_fetch_array($result)){
            $id = $row['id'];
            $lock_id = $row['lock_id'];
            $thumbImg = $row['thumbImg'];
            $en_summary = $row['en_summary'];
            $cn_summary = $row['cn_summary'];
            $jp_summary = $row['jp_summary'];
            $kr_summary = $row['kr_summary'];
            $en_title = $row['en_title'];
            $cn_title = $row['cn_title'];
            $jp_title = $row['jp_title'];
            $kr_title = $row['kr_title'];
            $en_description = $row['en_description'];
            $cn_description = $row['cn_description'];
            $jp_description = $row['jp_description'];
            $kr_description = $row['kr_description'];
            $security = $row['security'];
            $spec = $row['spec'];
            $weight = $row['weight'];
            $icons = $row['icons'];
            $colors = $row['colors'];
            $manual = $row['manual'];
            $carouselImg = $row['carouselImg'];
            $videoLink = $row['videoLink'];
            $show = $row['showInfo'];
    }

    // get the category result for this id
    $cat_query = "SELECT lock_cat_list.*, lock_categories.* FROM lock_cat_list INNER JOIN lock_categories ON lock_cat_list.cat_id = lock_categories.cat_id AND lock_cat_list.product_id='".$id."'";
    
    $cat_result = mysqli_query($con, $cat_query);
    
    $cat_idArr = array();

    while($cat_row = mysqli_fetch_array($cat_result)){
      array_push($cat_idArr, $cat_row["cat_id"]);
    }

}
 ?>

	<form action="editLock.php?id=<? echo $lock_id; ?>" method="post">
     <input type="hidden" name="id_p" value="<?php echo $id; ?>">
		 <table width = "400" border = "0" cellspacing = "1" cellpadding = "2">
             <tr>
                <td width = "200">Lock_ID</td>
                <td><input name = "lock_id_p" type = "text" size="50"
                   id = "lock_id" value="<?php echo $lock_id; ?>">
                </td>
             </tr>
             <tr>
                <td width = "200">Lock_Categories</td>
                <td><input type="checkbox" name="lock_cat[]" value="1"
                      <?php if(in_array("1", $cat_idArr)){ echo "checked"; } ?>
                    > ulac lock <br/>
                    <input type="checkbox" name="lock_cat[]" value="2"
                      <?php if(in_array("2", $cat_idArr)){ echo "checked"; } ?>
                    > combo lock <br/>
                    <input type="checkbox" name="lock_cat[]" value="3"
                      <?php if(in_array("3", $cat_idArr)){ echo "checked"; } ?>
                    > cable lock <br/>
                    <input type="checkbox" name="lock_cat[]" value="4"
                      <?php if(in_array("4", $cat_idArr)){ echo "checked"; } ?>
                    > chain lock <br/>
                    <input type="checkbox" name="lock_cat[]" value="5"
                      <?php if(in_array("5", $cat_idArr)){ echo "checked"; } ?>
                    > ulock <br/>
                    <input type="checkbox" name="lock_cat[]" value="6"
                      <?php if(in_array("6", $cat_idArr)){ echo "checked"; } ?>
                    > speciality lock <br/>
                    <input type="checkbox" name="lock_cat[]" value="7"
                      <?php if(in_array("7", $cat_idArr)){ echo "checked"; } ?>
                    > key lock <br/>
                    <input type="checkbox" name="lock_cat[]" value="8"
                      <?php if(in_array("8", $cat_idArr)){ echo "checked"; } ?>
                    > alarm lock <br/>
                    <input type="checkbox" name="lock_cat[]" value="9"
                      <?php if(in_array("9", $cat_idArr)){ echo "checked"; } ?>
                    > folding lock <br/>
                    <input type="checkbox" name="lock_cat[]" value="10"
                      <?php if(in_array("10", $cat_idArr)){ echo "checked"; } ?>
                    > accessories <br/>
                </td>
             </tr>
			 <tr>
                <td width = "200">Product Visibility</td>
                <td>
                    <input type="radio" name="show_p" 
                    	<?php if ($show == 1) echo "checked";?> value="1">show 
					<input type="radio" name="show_p" 
						<?php if ($show != 1) echo "checked";?> value="0">hide
				</td>
             </tr>
             <tr>
                <td width = "200">thumbImg</td>
                <td><textarea name = "thumbImg_p" type = "text" rows="4" cols="50"
                   id = "thumbImg" ><?php echo htmlspecialchars($thumbImg); ?></textarea></td>
             </tr>
          
             <tr>
                <td width = "200">en_summary</td>
                <td><textarea name = "en_summary_p" type = "text" rows="4" cols="50"
                   id = "en_summary"><?php echo htmlspecialchars($en_summary); ?></textarea></td>
             </tr>

             <tr>
                <td width = "200">cn_summary</td>
                <td><textarea name = "cn_summary_p" type = "text" rows="4" cols="50"
                   id = "cn_summary" ><?php echo htmlspecialchars($cn_summary); ?></textarea></td>
             </tr>
             <tr>
                <td width = "200">jp_summary</td>
                <td><textarea name = "jp_summary_p" type = "text" rows="4" cols="50"
                   id = "jp_summary" ><?php echo htmlspecialchars($jp_summary); ?></textarea></td>
             </tr>
             <tr>
                <td width = "200">kr_summary</td>
                <td><textarea name = "kr_summary_p" type = "text" rows="4" cols="50"
                   id = "kr_summary" ><?php echo htmlspecialchars($kr_summary); ?></textarea></td>
             </tr>

             <tr>
                <td width = "200">en_title</td>
                <td><input name = "en_title_p" type = "text" size="50"
                   id = "en_title" value="<?php echo $en_title; ?>"></td>
             </tr>

             <tr>
                <td width = "200">cn_title</td>
                <td><input name = "cn_title_p" type = "text" size="50"
                   id = "cn_title" value="<?php echo $cn_title; ?>"></td>
             </tr>

             <tr>
                <td width = "200">jp_title</td>
                <td><input name = "jp_title_p" type = "text" size="50"
                   id = "jp_title" value="<?php echo $jp_title; ?>"></td>
             </tr>

             <tr>
                <td width = "200">kr_title</td>
                <td><input name = "kr_title_p" type = "text" size="50"
                   id = "kr_title" value="<?php echo $kr_title; ?>"></td>
             </tr>

             <tr>
                <td width = "200">en_description</td>
                <td><textarea name = "en_description_p" type = "text" rows="4" cols="50"
                   id = "en_description" ><?php echo htmlspecialchars($en_description); ?></textarea></td>
             </tr>

             <tr>
                <td width = "200">cn_description</td>
                <td><textarea name="cn_description_p" type = "text" rows="4" cols="50"
                   id = "cn_description"><?php echo htmlspecialchars($cn_description); ?></textarea></td>
             </tr>

             <tr>
                <td width = "200">jp_description</td>
                <td><textarea name = "jp_description_p" type = "text" rows="4" cols="50"
                   id = "jp_description" ><?php echo htmlspecialchars($jp_description); ?></textarea></td>
             </tr>

             <tr>
                <td width = "200">kr_description</td>
                <td><textarea name = "kr_description_p" type = "text" rows="4" cols="50"
                   id = "kr_description"><?php echo htmlspecialchars($kr_description); ?></textarea></td>
             </tr>

             <tr>
                <td width = "200">security</td>
                <td><input name = "security_p" type = "text" size="50"
                   id = "security" value="<?php echo $security; ?>"></td>
             </tr>

             <tr>
                <td width = "200">spec</td>
                <td><input name = "spec_p" type = "text" size="50"
                   id = "spec" value="<?php echo $spec; ?>"></td>
             </tr>

             <tr>
                <td width = "200">weight</td>
                <td><input name = "weight_p" type = "text" size="50"
                   id = "weight" value="<?php echo $weight; ?>"></td>
             </tr>
          	<tr>
                <td width = "200">icons</td>
                <td><textarea name = "icons_p" type = "text" rows="4" cols="50"
                   id = "icons"><?php echo htmlspecialchars($icons); ?></textarea></td>
             </tr>
             <tr>
                <td width = "200">colors</td>
                <td><textarea name = "colors_p" type = "text" rows="4" cols="50"
                   id = "colors"><?php echo htmlspecialchars($colors); ?></textarea></td>
             </tr>

             <tr>
                <td width = "200">carouselImg</td>
                <td><textarea name = "carouselImg_p" type = "text" rows="8" cols="50"
                   id = "carouselImg" ><?php echo htmlspecialchars($carouselImg); ?></textarea></td>
             </tr>

             <tr>
                <td width = "200">manualLink</td>
                <td><textarea name = "manual_p" type = "text" rows="4" cols="50"
                   id = "manual" ><?php echo htmlspecialchars($manual); ?></textarea></td>
             </tr>
             <tr>
                <td width = "200">videoEmbedLink</td>
                <td><textarea name = "videoLink_p" type = "text" rows="4" cols="50"
                   id = "videoLink" ><?php echo htmlspecialchars($videoLink); ?></textarea></td>
             </tr>
             <tr>
                <td width = "200"> </td>
                <td>
                   <input name="update" type = "submit" id = "update" 
                      value = "update this Item">
                </td>
             </tr>
          
          </table>
	</form>
   </body>
</html>