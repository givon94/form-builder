<?php

$_POST = json_decode(file_get_contents('php://input'), true);

$html = $_POST['html'];
$zip_name = time().".zip";
$files = ['form_style.min.css', 'Инструкция.docx', 'form_script.js'];
$file_folder = "files/";

if ($html) {
    $newHtml = str_replace('<!---->', '', $html);

    $zip = new ZipArchive;
    $res = $zip->open($zip_name, ZipArchive::CREATE);

    if ($res === TRUE) {
        $zip->addFromString('form.txt', $newHtml);

        foreach($files as $file) {
			$zip->addFile($file_folder.$file, $file);
		}
        $zip->close();
        echo $zip_name;
    }   else {
        echo 'error';
    }
}