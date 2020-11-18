<?php

$_POST = json_decode(file_get_contents('php://input'), true);

$html = $_POST['html'];
$attr_name = $_POST['attr_name'];
$zip_name = time().".zip";
$files_lib = ['form_style.min.css', 'Инструкция.pdf', 'Ссылки подключения файлов.txt', 'form_script.js', 'jquery-3.3.1.min.js'];
$files_lib_folder = "files/";
$file_html = 'files/index.html';

if ($html && $attr_name) {
    $html_new = str_replace('<!---->', '', $html);

    $zip = new ZipArchive;
    $res = $zip->open($zip_name, ZipArchive::CREATE);

    if ($res === TRUE) {
        foreach ($attr_name as $key=>$value) {
            $attrName .= htmlspecialchars($value) . PHP_EOL;
        }

        $zip->addFromString('form/Название полей.txt', $attrName);
        $zip->addFromString('form/form.txt', $html_new);
        $file_html_source = file_get_contents($file_html);
        $file_html_source = str_replace('<!--  Add here  -->',$html_new,$file_html_source);

        $zip->addFromString('form/index.html', $file_html_source);

        foreach($files_lib as $file) {
			$zip->addFile($files_lib_folder . $file, 'form/' . $file);
		}
        $zip->close();
        echo $zip_name;
    }   else {
        echo 'error';
        die();
    }
}

die();