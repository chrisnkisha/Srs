function l() {
	chrome.storage.local.get(["id", "pass"], function(d) {
		$("input[name=ID]").val(d["id"]);
		$("input[name=PWD]").val(d["pass"]);
		if ($("button").html() == "Go") {
			$.ajax({
				url: "https://stars.bilkent.edu.tr/srs/ajax/login.php",
				data: { ID: d["id"], PWD: d["pass"] },
				method: "POST",
				success: function(resp) {
					if (resp == "HOME") {
						chrome.tabs.create({url: "https://stars.bilkent.edu.tr/srs"});
					}
				}
			});
		}
	});
}

window.onload = function() {
	l();
	$("button").click(function() {
		chrome.storage.local.set({"id": $("input[name=ID]").val(), "pass": $("input[name=PWD]").val()}, function() {
			l();
		});
	});
};
