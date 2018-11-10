<?php
	require_once('../cms/serverConfig.php');
	
	$catName = $_GET["cat"];
	$lock_id = $_GET["lock"];

	//echo "Connected successfully";

	if(!empty($_GET["cat"]) && $catName == all){
		$query = "SELECT * From lock_content";
		//echo $query;

	// all other category
	}else if(!empty($_GET["cat"])){
		$catQuery = "SELECT * FROM lock_categories WHERE lock_categories.name='".$catName."'";
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
		$query = "SELECT lock_content.id, lock_content.* From lock_cat_list INNER JOIN lock_content 
				  ON lock_cat_list.product_id = lock_content.id AND lock_cat_list.cat_id = '".$cat_id."'";
		
		//echo $query;

	// if get the product
	}else if(!empty($_GET["lock"])){
		$query = "SELECT * From lock_content WHERE lock_id = '".$lock_id."'";


	// other condition all treat as category = all
	}else{
		$query = "SELECT * From lock_content";
	}

	$result = mysqli_query($con, $query);

	if ($result){

		$listResult = array();
		$arryIndex = 0;

		while($list = mysqli_fetch_array($result)){
		if ($list['showInfo'] == 1) {
			$show = true;
		} else {
			$show = false;
		}
		
		$innerlistArray = array(
				'lock_id' => $list['lock_id'],
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
				'security' => $list['security'],
				'spec' => $list['spec'],
				'icons' => $list['icons'],
				'colors' => $list['colors'],
				'weight' => $list['weight'],
				'carouselImg' => $list['carouselImg'],
				'manual' => $list['manual'],
				'videoLink' => $list['videoLink'],
				'show' => $show
			);
		
			$listArray = array($arryIndex => $innerlistArray);
			
			$listResult = $listResult + $listArray;
			$arryIndex = $arryIndex + 1;
		}

		echo json_encode($listResult, JSON_UNESCAPED_UNICODE); 

    } else {

        echo "sql error " . mysql_error()."<br><b>$query</b>";
        die();
    }

	$con->close();
?>