﻿var current_path = File($.fileName).path;
var source_folder = new Folder(current_path + '/source')
var destination_folder = new Folder(current_path + '/pdf')

var files_to_convert = []

scan_folder(source_folder)

function scan_folder (folder_to_scan) {
	var files = folder_to_scan.getFiles()
	for (file_id in files) {
		var file = files[file_id]
		if (file instanceof File ){
			if (String(file).match(/\.ai$/) && !String(file).match(/\/master\//) && !String(file).match(/\/template\//)) {
				files_to_convert.push(file)
			}
		} else {
			scan_folder(file)
		}
	}
}

for (file_id in files_to_convert) {
	var file = files_to_convert[file_id]
	var file_path = String(file)
	var destination_folder = new Folder(file_path.substring(0, file_path.lastIndexOf('/') + 1).replace(/source/, 'pdf'))

	if (!destination_folder.exists) {
		destination_folder.create()
	}

	var doc = app.open(file)

	var target_file = new File(String(file).replace(/source/, 'pdf').replace(/\.at/, '.pdf'))

	doc.saveAs(target_file, getPDFOptions())

	doc.close()
}

function getPDFOptions () {

	var pdfSaveOpts = new PDFSaveOptions()

	pdfSaveOpts.acrobatLayers = false
	pdfSaveOpts.colorBars = false
	pdfSaveOpts.colorCompression = CompressionQuality.AUTOMATICJPEGHIGH
	pdfSaveOpts.compressArt = true //default
	pdfSaveOpts.embedICCProfile = true
	pdfSaveOpts.enablePlainText = true
	pdfSaveOpts.generateThumbnails = true // default
	pdfSaveOpts.optimization = true
	pdfSaveOpts.pageInformation = false
	pdfSaveOpts.preserveEditability = false

	return pdfSaveOpts
}