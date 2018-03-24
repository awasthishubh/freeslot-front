
var l=[], n, r, e, p;


function editable(str){
if(window.l.includes(str)){
var x=window.l.indexOf(str);
if(x>-1){
document.getElementById("a"+str).classList.remove("white-text");
document.getElementById("a"+str).classList.remove("z-depth-4");
document.getElementById("a"+str).classList.remove("pink");
window.l.splice(x,1);
}
console.log(window.l);
}
else{
window.l.push(str)
document.getElementById("a"+str).className+=" white-text z-depth-4 pink";
console.log(window.l);
}
}
function popup(){
	
}
/*Changing layout if mobile*/
function changeview(){
	if(document.getElementsByClassName('cellz')[0].style.display==='table-cell'){
	console.log(1);
		var el=document.getElementsByClassName('cellz');
		for(var i=0;i<el.length;i++){
			el[i].style.display="none";
		}
		var el=document.getElementsByClassName('cell');
		for(var i=0;i<el.length;i++){
			el[i].style.display="table-cell";
		}
		var el=document.getElementsByClassName('timings2');
		for(var i=0;i<el.length;i++){
			el[i].style.display="none";
		}
		var el=document.getElementsByClassName('timings');
		for(var i=0;i<el.length;i++){
			el[i].style.display="table-cell";
		}
		var el=document.getElementsByClassName('lunchcell');
		for(var i=0;i<el.length;i++){
			el[i].style.display="table-cell";
		}
	}
	else{
		var el=document.getElementsByClassName('cellz');
		for(var i=0;i<el.length;i++){
			el[i].style.display="table-cell";
		}
		var el=document.getElementsByClassName('cell');
		for(var i=0;i<el.length;i++){
			el[i].style.display="none";
		}
		var el=document.getElementsByClassName('timings2');
		for(var i=0;i<el.length;i++){
			el[i].style.display="table-cell";
		}
		var el=document.getElementsByClassName('timings');
		for(var i=0;i<el.length;i++){
			el[i].style.display="none";
		}
		var el=document.getElementsByClassName('lunchcell');
		for(var i=0;i<el.length;i++){
			el[i].style.display="none";
		}	
	}
}

function reset(){
	var el=document.getElementsByClassName('cell');
		for(var i=0;i<el.length;i++){
			el[i].classList.remove("white-text");
			el[i].classList.remove("z-depth-4");
			el[i].classList.remove("pink");
		}
	var el=document.getElementsByClassName('cellz');
		for(var i=0;i<el.length;i++){
			el[i].classList.remove("white-text");
			el[i].classList.remove("z-depth-4");
			el[i].classList.remove("pink");
		}
	l=[];
	console.log(l);
}

function get(){
	d=$('input[name=day]:checked').attr('id');
	t=$('input[name=time]:checked').attr('id');
	if(d==undefined || t==undefined){
		alert("Please Choose First");	
		return	;
	}

	d=parseInt(d.slice(1));
	t=parseInt(t.slice(1));
	slot=(d-1)*14+t;
	console.log(slot);

	$.ajax({
          type:'GET',
          url:'https://slotfree.herokuapp.com/getreq',
          data: { 
          'slot': slot
          },
          beforeSend: function() {
              
              console.log("begoresend");
              
               $('#sub').hide('slow');
				$('#prg').show('slow');
          }
          }).done(function(data){
          	if(data.status==0){
              	alert("No ones free");
              	$('#sub').show('slow');
				$('#prg').hide('slow');
				return	;
              }
              console.log("sentdffd");
              data.data.forEach(function(mem){
              	txt="<b>Name:</b> "+mem.name+"<br><b>RegNo:</b> "+mem.reg+"<br><b> Email:</b> "+mem.email+"<br><b> PhoneNo:</b> "+mem.phno+"<br><br>";
              	$("#content").html($("#content").html()+txt);
              })
              console.log(data);
              
              $('#pg1').hide('slow');
				$('#pg2').show('slow');
				$('#sub').show('slow');
				$('#prg').hide('slow');
              //
             
          })
}

function bck(){
	console.log('clicked')

	$('#pg1').show('slow');
	$('#pg2').hide('slow');
}

function pst(){
	console.log("sd");
	
	window.n=$('#name').val();
	window.e=$('#email').val();
	window.r=$('#reg').val();
	window.p=$('#phno').val();
	if(window.r=='a' || window.e=='' || window.n=='' || window.p==''){
		alert("Enter Inputs")
		return
	}
	console.log([n,e,r,p])
	$("#register").hide("slow");
	$("#tablecontent").show("slow");
}

function submit2(){
	$.ajax({
          type:'GET',
          url:'https://slotfree.herokuapp.com/postreq',
          data: { 
          'slot':window.l,
          'name':window.n,
          'reg':window.r,
          'email':window.e,
          'phno':window.p

          },
          beforeSend: function() {
              console.log("begoresend");
				$('#prg').show('slow');
				$('#but').hide('slow');
          }
          }).done(function(data){
          	console.log(data);
          	if(data.status==0){
              	alert("User Already Exists");
              	$('#register').show('slow');
              	$('#prg').hide('slow');
              	$('#but').show('slow');
              	$('#tablecontent').hide('slow');
              	reset();
				return	;
              }
              console.log("sentdffd");
              console.log(data);
              
              $('#tablecontent').hide('slow');
				$('#msg').show('slow');
				$('#but').show('slow');
				$('#prg').hide('slow');
              //
             
          })
}

function bk2() {
	$('#register').show('slow');
	$('#msg').hide('slow');
	reset();
	console.log('bk');	
}