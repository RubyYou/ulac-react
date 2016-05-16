<html>
   
   <head>
      <title>Add New Record in ULAC CONTENT</title>
   </head>
   
   <body>

<?php
      if(isset($_POST['add'])) {
          	require_once('serverConfig.php');
            
            $product_id = $_POST['product_id'];
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
            $en_details = $_POST['en_details'];
            $cn_details = $_POST['cn_details'];
            $jp_details = $_POST['jp_details'];
            $kr_details = $_POST['kr_details'];
            $security = $_POST['security'];
            $spec = $_POST['spec'];
            $weight = $_POST['weight'];
            $icons = $_POST['icons'];
            $manual = $_POST['manual'];
            $videoLink = $_POST['videoLink'];
            $carouselImg = $_POST['carouselImg'];

            $contentTableName = 'lock_content';
            $sql = '';

            if($_POST['product_type'] == 'lite'){

              $sql = "INSERT INTO lite_content". "(lite_id, thumbImg, en_summary, 
                     cn_summary, jp_summary, kr_summary, en_title, cn_title, jp_title, kr_title,
                     en_description, cn_description, jp_description, kr_description, en_details,
                     jp_details, cn_details, kr_details, icons, carouselImg, manual, videoLink) "
                     ."VALUES('$product_id','$thumbImg','$en_summary', 
                     '$cn_summary', '$jp_summary', '$kr_summary', '$en_title', '$cn_title', 
                     '$jp_title', '$kr_title', '$en_description', '$cn_description', 
                     '$jp_description', '$kr_description', '$en_details', '$jp_details',
                     '$cn_details', '$kr_details', '$icons', '$carouselImg', '$manual', '$videoLink')";
              
              $contentTableName = 'lite_content';
              
              
            }else{

              $sql = "INSERT INTO lock_content". "(lock_id, thumbImg, en_summary, 
                     cn_summary, jp_summary, kr_summary, en_title, cn_title, jp_title, kr_title,
                     en_description, cn_description, jp_description, kr_description, security, spec, weight, 
                     icons, carouselImg, manual, videoLink) "."VALUES('$product_id','$thumbImg','$en_summary', 
                     '$cn_summary', '$jp_summary', '$kr_summary', '$en_title', '$cn_title', 
                     '$jp_title', '$kr_title', '$en_description', '$cn_description', 
                     '$jp_description', '$kr_description', '$security', '$spec', '$weight', 
                     '$icons', '$carouselImg','$manual', '$videoLink')";

            }
          
            $retval = mysqli_query( $con, $sql);

            if(! $retval ) {
               die('Could not enter data: ' . mysqli_error());
            }
            
            echo "Entered data successfully\n <br/>";

            //insert the categories for each product 
            if(!empty($_POST['lite_cat'] && $_POST['product_type'] == 'lite')){
              $lastId_query = "SELECT * FROM lite_content ORDER BY id DESC LIMIT 1";
              $lastId_result = mysqli_query( $con, $lastId_query);

              while($row = mysqli_fetch_array($lastId_result)){ 
                $lastId = $row['id'];
              }

              echo "lastID: ".$lastId."<br/>";

              foreach($_POST['lite_cat'] as $check) {  
                $cat_sql = "INSERT INTO lite_cat_list (cat_id, product_id) VALUES ('$check', '$lastId')";
                mysqli_query( $con, $cat_sql);
                echo "lite_cat ".$check."<br/>";
                echo $cat_sql;
              }

            }else{
              
              $lastId_query = "SELECT * FROM lock_content ORDER BY id DESC LIMIT 1";
              $lastId_result = mysqli_query( $con, $lastId_query);

              while($row = mysqli_fetch_array($lastId_result)){ 
                $lastId = $row['id'];
              }

              echo "lastID: ".$lastId."<br/>";

              foreach($_POST['lock_cat'] as $check) {  
                $cat_sql = "INSERT INTO lock_cat_list (cat_id, product_id) VALUES ('$check', '$lastId')";
                mysqli_query( $con, $cat_sql);
                echo "lock_cat ".$check."<br/>";
                echo $cat_sql;
              }
            }

            mysqli_close($con);
         } else {
    ?>

	<form action="dataInput.php" method="post">
    <h3>Select lock or lite to start and follow the right text example to add infomation</h3>
		 <table width = "400" border = "0" cellspacing = "1" cellpadding = "2">
         <tr>
            <td width = "100">Product_Type</td>
            <td>Lock <input id="lock_product_type" type="radio" checked="checked" name="product_type" value="lock" onclick="switchSection('lock')"><br>
                Lite <input id="lite_product_type" type="radio" name="product_type" value="lite" onclick="switchSection('lite')"></td>
            <td></td>
         </tr>
         <tr>
            <td width = "100">Product_ID</td>
            <td><input name = "product_id" type = "text" id = "product_id"></td>
            <td>Example: A600</td>
         </tr>
         <tr class="lock-section">
           <td>Lock Categories</td>
           <td>
              <input type="checkbox" name="lock_cat[]" value="1"> ulac lock <br/>
              <input type="checkbox" name="lock_cat[]" value="2"> combo lock <br/>
              <input type="checkbox" name="lock_cat[]" value="3"> cable lock <br/>
              <input type="checkbox" name="lock_cat[]" value="4"> chain lock <br/>
              <input type="checkbox" name="lock_cat[]" value="5"> ulock <br/>
              <input type="checkbox" name="lock_cat[]" value="6"> speciality lock <br/>
              <input type="checkbox" name="lock_cat[]" value="7"> key lock <br/>
           </td>
         </tr>
         <tr class="lite-section">
           <td>Lite categories</td>
           <td>
              <input type="checkbox" name="lite_cat[]" value="1"> front lite<br/>
              <input type="checkbox" name="lite_cat[]" value="2"> safety lite<br/>
            </td>
         </tr>

         <tr>
            <td width = "100">thumbImg</td>
            <td><textarea name = "thumbImg" type = "text" id = "thumbImg"></textarea></td>
            <td>ex: images/lock/A600/A600_icon.png</td>
         </tr>
      
         <tr>
            <td width = "100">en_summary</td>
            <td><textarea name = "en_summary" type = "text" id = "en_summary"></textarea></td>
            <td>ex: Soft touch cable, Available in 2 lengths, Combination</td>
         </tr>

         <tr>
            <td width = "100">cn_summary</td>
            <td><textarea name = "cn_summary" type = "text" id = "cn_summary"></textarea></td>
            <td>ex: 环保材质,附托架,密码锁</td>
         </tr>
         <tr>
            <td width = "100">jp_summary</td>
            <td><textarea name = "jp_summary" type = "text" id = "jp_summary"></textarea></td>
            <td>エコ素材, 2種類ケーブル長さ, コンビネ?ション</td>
         </tr>
         <tr>
            <td width = "100">kr_summary</td>
            <td><textarea name = "kr_summary" type = "text" id = "kr_summary"></textarea></td>
            <td>친환경 소재,2종류의 케이블 길이,비밀번호 자물쇠</td>
         </tr>

         <tr>
            <td width = "100">en_title</td>
            <td><input name = "en_title" type = "text" id = "en_title"></td>
            <td>ZEN MASTER / Cable Lock / Combo</td>
         </tr>

         <tr>
            <td width = "100">cn_title</td>
            <td><input name = "cn_title" type = "text" id = "cn_title"></td>
            <td>ZEN MASTER / 卷形钢缆锁 / 密码开锁</td>
         </tr>

         <tr>
            <td width = "100">jp_title</td>
            <td><input name = "jp_title" type = "text" id = "jp_title"></td>
            <td>ZEN MASTER / エコケーブル / コンボ</td>
         </tr>

         <tr>
            <td width = "100">kr_title</td>
            <td><input name = "kr_title" type = "text" id = "kr_title"></td>
            <td>ZEN MASTER / Cable Lock / Combo</td>
         </tr>
         <tr>
            <td width = "100">en_description</td>
            <td><textarea name = "en_description" type = "text" id = "en_description"></textarea></td>
            <td>One of the most popular ULAC cable locks. Since its launch in 2011, we have sold more than 1 million pieces worldwide. The soft touch cable is not only eye candy but will protect your bicycle from scratching.</td>
         </tr>

         <tr>
            <td width = "100">cn_description</td>
            <td><textarea name="cn_description" type = "text" id = "cn_description"></textarea></td>
            <td>优力最畅销纲缆密码锁，自从2011发表以来世界至今已售出超过50万余把，环保软材质可保护您的爱车不被刮伤。</td>
         </tr>

         <tr>
            <td width = "100">jp_description</td>
            <td><textarea name = "jp_description" type = "text" id = "jp_description"></textarea></td>
            <td>ULAC会社のベストセラーケーブルロックは2011年から発売、 今までは50万個以上売れた、 環境保護の柔らかい材質は愛好者の自転車を保護することが可能です。</td>
         </tr>

         <tr>
            <td width = "100">kr_description</td>
            <td><textarea name = "kr_description" type = "text" id = "kr_description"></textarea></td>
            <td>ULAC 제품 중 많이 판매되고 있는 비밀번호 잠금의 강철 케이블 자물쇠입니다. 2011년 출시 이후 지금까지 전 세계적으로 50만 개 이상이 판매되었고, 친환경 소재로 제작되어 차체 손상을 방지해줍니다.</td>
         </tr>

         <tr class="lite-section">
            <td width = "100">en_details</td>
            <td><textarea name = "en_details" type = "text"></textarea></td>
            <td>Weight: 81g. including batteries | Mode: High beam (3H) / Low beam (18H) / Flashing (50H) | Aluminum + PC | D:98L x 26W x 26Hmm | Alkaline AA x 1</td>
         </tr>

         <tr class="lite-section">
            <td width = "100">cn_details</td>
            <td><textarea name = "cn_details" type = "text"></textarea></td>
            <td>Weight: 81g. including batteries | Mode: High beam (3H) / Low beam (18H) / Flashing (50H) | Aluminum + PC | D:98L x 26W x 26Hmm | Alkaline AA x 1</td>
         </tr>

         <tr class="lite-section">
            <td width = "100">jp_details</td>
            <td><textarea name = "jp_details" type = "text"></textarea></td>
            <td>Weight: 81g. including batteries | Mode: High beam (3H) / Low beam (18H) / Flashing (50H) | Aluminum + PC | D:98L x 26W x 26Hmm | Alkaline AA x 1</td>
         </tr>

         <tr class="lite-section">
            <td width = "100">kr_details</td>
            <td><textarea name = "kr_details" type = "text"></textarea></td>
            <td>Weight: 81g. including batteries | Mode: High beam (3H) / Low beam (18H) / Flashing (50H) | Aluminum + PC | D:98L x 26W x 26Hmm | Alkaline AA x 1</td>
         </tr>

         <tr class="lock-section">
            <td width = "100">security</td>
            <td><input name = "security" type = "text" id = "security"></td>
            <td>3</td>
         </tr>

         <tr class="lock-section">
            <td width = "100">spec</td>
            <td><input name = "spec" type = "text" id = "spec"></td>
            <td>10mm x 150cm / Coil Steel Cable</td>
         </tr>

         <tr class="lock-section">
            <td width = "100">weight</td>
            <td><input name = "weight" type = "text" id = "weight"></td>
            <td>330g</td>
         </tr>

      	<tr>
            <td width = "100">icons</td>
            <td><textarea name = "icons" type = "text" id = "icons"></textarea></td>
            <td>coil-cable.png,combination.png,eco-friendly.png,bracket.png</td>
         </tr>
         <tr>
            <td width = "100">carouselImg</td>
            <td><textarea name = "carouselImg" type = "text" id = "carouselImg"></textarea></td>
            <td>images/lock/A600/A600_1.jpg,images/lock/A600/A600_2.jpg,images/lock/A600/A600_3.jpg,images/lock/A600/A600_4.jpg,images/lock/A600/A600_5.jpg,images/lock/A600/A600_6.jpg,images/lock/A600/A600_7.jpg,images/lock/A600/A600_8.jpg,images/lock/A600/A600_9.jpg</td>
         </tr>

         <tr>
            <td width = "100">manualLink</td>
            <td><textarea name = "manual" type = "text" id = "manual"></textarea></td>
            <td>images/manual/ULAC_A600_manual.png</td>
         </tr>
         <tr >
            <td width = "100">videoEmbedLink</td>
            <td><textarea name = "videoLink" type = "text" id = "videoLink"></textarea></td>
            <td>//www.youtube.com/embed/R53gWcNNizA</td>
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
   <script>
      var liteSections = document.querySelectorAll('.lite-section');
      var lockSections = document.querySelectorAll('.lock-section');
      
      function switchSection(sectionName){

          if(sectionName == 'lite'){
            
            for(var i = 0; i <liteSections.length ; i++){
                liteSections[i].style.display = 'block';
            }
            
            for(var j = 0; j <lockSections.length ; j++){
                lockSections[j].style.display = 'none';
            }

          } else {
            
            for(var i = 0; i <liteSections.length ; i++){
                liteSections[i].style.display = 'none';
            }
            
            for(var j = 0; j <lockSections.length ; j++){
                lockSections[j].style.display = 'block';
            }
          }
      }

   </script>
   <style>
    /* default setting*/
    tr{display: block}
    .lite-section{ display: none;}
   </style>
</html>