import React from 'react';

export default function Fail (props){
	
  return(
<div>
	<center>
		<font face='Thoma' size='19' color='red'>
			<b>Fail!</b>
			<br />
			<i>Wrong anwser</i>
			<br />
			<button onClick={props.onNext}>Fler frågor!</button> 
		</font>

	</center>
</div>
);
}
