<html>
   
   <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <title>Edit a old Record in ULAC CONTENT</title>
   </head>
   
   <body>

<?php


if(isset($_GET['id'])){
  
  $product_id=$_GET['id'];

  require_once('serverConfig.php');

  if(isset($_POST['update'])){

    $id_p = $_POST['id_p'];
    $product_id_p = $_POST['product_id_p'];
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
    $en_details_p = $_POST['en_details_p'];
    $cn_details_p = $_POST['cn_details_p'];
    $jp_details_p = $_POST['jp_details_p'];
    $kr_details_p = $_POST['kr_details_p'];
    $icons_p = $_POST['icons_p'];
    $carouselImg_p = $_POST['carouselImg_p'];
    $manual_p = $_POST['manual_p'];
    $videoLink_p = $_POST['videoLink_p'];

    $updateSql = "UPDATE acc_content SET product_id = '$product_id_p',
                  thumbImg = '$thumbImg_p', 
                  en_summary = '$en_summary_p',
                  cn_summary = '$cn_summary_p', 
                  jp_summary = '$jp_summary_p',
                  kr_summary = '$kr_summary_p', 
                  en_title = '$en_title_p',
                  cn_title = '$cn_title_p', 
                  jp_title = '$jp_title_p', 
                  kr_title = '$kr_title_p', 
                  cn_description = '$cn_description_p',
                  en_description = '$en_description_p', 
                  jp_description = '$jp_description_p',
                  kr_description = '$kr_description_p', 
                  en_details = '$en_details_p',
                  cn_details = '$cn_details_p', 
                  jp_details = '$jp_details_p',
                  kr_details = '$kr_details_p', 
                  icons = '$icons_p', 
                  carouselImg = '$carouselImg_p',
                  manual = '$manual_p',
                  videoLink = '$videoLink_p'
                  WHERE id = '$id_p'";

    $update = mysqli_query($con, $updateSql);
    
    if(!$update ) {
       die('Could not enter data: ' . mysqli_error());
    }

    if($updated){
      $msg="Successfully Updated!!";
    }
  }

    $query="SELECT * FROM acc_content WHERE product_id='".$product_id."'";
    
    $result = mysqli_query( $con, $query);

    while($row = mysqli_fetch_array($result)){
            $id = $row['id'];
            $product_id = $row['product_id'];
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
            $en_details = $row['en_details'];
            $cn_details = $row['cn_details'];
            $jp_details = $row['jp_details'];
            $kr_details = $row['kr_details'];
            $icons = $row['icons'];
            $carouselImg = $row['carouselImg'];
            $manual = $row['manual'];
            $videoLink = $row['videoLink'];

    }

}
 ?>

	<form action="editAccessories.php?id=<? echo $product_id; ?>" method="post">
     <input type="hidden" name="id_p" value="<?php echo $id; ?>">
		 <table width = "400" border = "0" cellspacing = "1" 
             cellpadding = "2">
            
             <tr>
                <td width = "200">product_ID</td>
                <td><input name = "product_id_p" type = "text" size="50"
                   id = "product_id" value="<?php echo $product_id; ?>">
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
                <td width = "200">en_details</td>
                <td><textarea name = "en_details_p" type = "text" rows="4" cols="50"
                   id = "en_details"><?php echo htmlspecialchars($en_details); ?></textarea></td>
             </tr>

             <tr>
                <td width = "200">cn_details</td>
                <td><textarea name = "cn_details_p" type = "text" rows="4" cols="50"
                   id = "cn_details"><?php echo htmlspecialchars($cn_details); ?></textarea></td>
             </tr>

             <tr>
                <td width = "200">jp_details</td>
                <td><textarea name = "jp_details_p" type = "text" rows="4" cols="50"
                   id = "jp_details"><?php echo htmlspecialchars($jp_details); ?></textarea></td>
             </tr>

             <tr>
                <td width = "200">kr_details</td>
                <td><textarea name = "kr_details_p" type = "text" rows="4" cols="50"
                   id = "kr_details"><?php echo htmlspecialchars($kr_details); ?></textarea></td>
             </tr>
             
          	<tr>
                <td width = "200">icons</td>
                <td><textarea name = "icons_p" type = "text" rows="4" cols="50"
                   id = "icons"><?php echo htmlspecialchars($icons); ?></textarea></td>
             </tr>

             <tr>
                <td width = "200">carouselImg</td>
                <td><textarea name = "carouselImg_p" type = "text" rows="8" cols="50"
                   id = "carouselImg" ><?php echo htmlspecialchars($carouselImg); ?></textarea></td>
             </tr>

             <tr>
                <td width = "200">manual</td>
                <td><textarea name = "manual_p" type = "text" rows="8" cols="50"
                   id = "manual" ><?php echo htmlspecialchars($manual); ?></textarea></td>
             </tr>

             <tr>
                <td width = "200">videoLink</td>
                <td><textarea name = "videoLink_p" type = "text" rows="8" cols="50"
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