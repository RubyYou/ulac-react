<?php
	require_once('../cms/serverConfig.php');

	$catName = $_GET["cat"];
	$lite_id = $_GET["lite"];

	//echo "Connected successfully";

	if(!empty($_GET["cat"]) && $catName == all){
		$query = "SELECT * From lite_content";
		//echo $query;

	// all other category
	}else if(!empty($_GET["cat"])){
		$catQuery = "SELECT * FROM lite_categories WHERE lite_categories.name='".$catName."'";
    	$cat_list = mysqli_query( $con, $catQuery);

    	if($cat_list){
			while($cat_result = mysqli_fetch_array($cat_list)){
				//echo $cat_result['cat_id'];
				$cat_id = $cat_result['cat_id'];
			}
		}else{
			echo "sql error " . mysql_error()."<br><b>$catQuery</b>";
	        die();
		}

		// get cat
		$query = "SELECT lite_content.id, lite_content.* From lite_cat_list INNER JOIN lite_content 
				  ON lite_cat_list.product_id = lite_content.id AND lite_cat_list.cat_id = '".$cat_id."'";
		
		//echo $query;

	// if get the product
	}else if(!empty($_GET["lite"])){
		$query = "SELECT * From lite_content WHERE lite_id = '".$lite_id."'";


	// other condition all treat as category = all
	}else{
		$query = "SELECT * From lite_content";
	}

	$result = mysqli_query($con, $query);

	if ($result){

		$listResult = array();
		$arryIndex = 0;

		while($list = mysqli_fetch_array($result)){

		$innerlistArray = array(
				'lite_id' => $list['lite_id'],
				'thumbImg' => $list['thumbImg'],
				'en_summary' => $list['en_summary'],
				'jp_summary' => $list['jp_summary'],
				'cn_summary' => $list['cn_summary'],
				'kr_summary' => $list['kr_summary'],
				'en_title' => $list['en_title'],
				'jp_title' => $list['jp_title'],
				'cn_title' => $list['cn_title'],
				'kr_title' => $list['kr_title'],
				'en_description' => $list['en_description'],
				'jp_description' => $list['jp_description'],
				'cn_description' => $list['cn_description'],
				'kr_description' => $list['kr_description'],
				'en_details' => $list['en_details'],
				'jp_details' => $list['jp_details'],
				'cn_details' => $list['cn_details'],
				'kr_details' => $list['kr_details'],
				'icons' => $list['icons'],
				'carouselImg' => $list['carouselImg'],
				'manual' => $list['manual'],
				'videoLink' => $list['videoLink']
			);
		
			$listArray = array($arryIndex => $innerlistArray);
			
			$listResult = $listResult + $listArray;
			$arryIndex = $arryIndex + 1;
		}

		echo json_encode($listResult, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);


    } else {

        echo "sql error " . mysql_error()."<br><b>$query</b>";
        die();
    }

	$con->close();
?>