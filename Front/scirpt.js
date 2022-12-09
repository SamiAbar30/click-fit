$(function () {
	factChanger();

	$('#upload-image').change(function (e) {
		handleFile(e);
	});
});
async function factChanger() {
	let result = await fetch('http://numbersapi.com/1/30/date?json').then(
		(result) => result.json(),
	);
	$('.marquee-fact').text(result.text);
}
async function handleFile(e) {
	let targetedFile = e.target.files[0];
	let fileExtension = targetedFile.name.split('.').pop();
	['png', 'jpg', 'jpeg'].forEach((extension) => {
		if (targetedFile && fileExtension === extension) {
			let reader = new FileReader();
			reader.onloadend = async () => {
				const data = {targetedFileName: targetedFile.name,img: reader.result };
				const result = await fetch('http://localhost:3001/v1/upload-image', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(data),
				}).then((result) => result.json());
			
        console.log(result.error);
        if (result.error) {
          console.log(result.error);
          $('#upload-area-text').text(result.error).css({"color":"#ff0000"});
        }
        if (result.msg) {
          console.log(result.msg);
          $('#upload-area-text').text(result.msg).css({"color":"#4BB543"});
        }
      };
			reader.readAsDataURL(targetedFile);
      
		}
	});
}
