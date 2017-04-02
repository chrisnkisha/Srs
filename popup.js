function l() {
	var e = (new Date()).getTime() / 1000;
	var hashObj = new jsSHA("SHA-256", "TEXT", {numRounds: 1});
	hashObj.update(e + "CMZ9rBFf40WNSSrsUdgQ");
	chrome.storage.local.get(["id", "pass"], function(d) {
		$("input[name=ID]").val(d["id"]);
		$("input[name=PWD]").val(d["pass"]);
		if ($("button").html() == "Go") {
			$.ajax({
				url: "https://stars.bilkent.edu.tr/srs/ajax/login.php",
				data: { A: "4045089c-a25f-11e6-80f5-76304dec7eb7",
					B: hashObj.getHash("HEX"),
					C: e,
					ID: d["id"],
					PWD: d["pass"]
				},
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
