<?php

$_POST = json_decode(file_get_contents('php://input'), true);

$html = $_POST['html'];
$attr_name = $_POST['attr_name'];
$zip_name = time().".zip";
$files_lib = ['Инструкция.pdf', 'Ссылки подключения файлов.txt'];
$fonts_dir = 'files/fonts';
$php_dir = 'files/php/phpmailer';
$files_lib_folder = "files/";
$file_style = "form_style.min.css";
$file_js = "form_script.js";
$file_jquery = "jquery-3.3.1.min.js";
$file_html = 'files/index.html';

if ($html && $attr_name) {
    $html_new = str_replace('<!---->', '', $html);

    $zip = new ZipArchive;
    $res = $zip->open($zip_name, ZipArchive::CREATE);

    if ($res === TRUE) {
        foreach ($attr_name as $key=>$value) {
            $attrVal = explode(":", $value);
            $attrValStr = str_replace(" ", "", $attrVal[1]);

            $attrValName .= '$' . $attrValStr . ' = $_POST["' . $attrValStr . '"];' . PHP_EOL;
            $attrValTable .= '
            <tr>
            	<td><b>' . $attrVal[0] . ':</b></td>
            	<td>$' . $attrValStr . '</td>
        	</tr>' . PHP_EOL;
        }

        $file_php_source = file_get_contents('files/mail.txt');
        $file_php_source = str_replace('<!--  Add POST  -->',$attrValName,$file_php_source);
        $file_php_source = str_replace('<!--  Add TABLE  -->',$attrValTable,$file_php_source);

        $zip->addFromString('form/form.txt', $html_new);
        $file_html_source = file_get_contents($file_html);
        $file_html_source = str_replace('<!--  Add here  -->',$html_new,$file_html_source);

        $zip->addFromString('form/index.html', $file_html_source);
        $zip->addFromString('form/php/mail.php', $file_php_source);
        $zip->addFile($files_lib_folder . $file_style, 'form/css/' . $file_style);
        $zip->addFile($files_lib_folder . $file_js, 'form/js/' . $file_js);
        $zip->addFile($files_lib_folder . $file_jquery, 'form/js/' . $file_jquery);

        foreach($files_lib as $file) {
			$zip->addFile($files_lib_folder . $file, 'form/' . $file);
		}

		$fonts_files = scandir($fonts_dir);
		foreach($fonts_files as $file){
		    if ($file == '.' || $file == '..' ){continue;}
		    $f = $fonts_dir.DIRECTORY_SEPARATOR.$file;
		    $zip->addFile($f, 'form/fonts/' . $file);
		}

        $php_files = scandir($php_dir);
        foreach($php_files as $file){
            if ($file == '.' || $file == '..' ){continue;}
            $f = $php_dir.DIRECTORY_SEPARATOR.$file;
            $zip->addFile($f, 'form/php/phpmailer/' . $file);
        }

        $zip->close();
        echo $zip_name;
    }   else {
        echo 'error';
        die();
    }
}

die();