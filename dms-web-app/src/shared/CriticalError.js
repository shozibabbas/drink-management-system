import React from "react";
import {useSelector} from "react-redux";
import {selectCriticalError} from "../redux/critical-error.slice";
import {Button, Modal} from "react-bootstrap";

function CriticalError() {
	const criticalError = useSelector(selectCriticalError);
	return (
		<Modal
			show={!!criticalError}
			onHide={() => {
			}}
			backdrop="static"
			keyboard={false}
			className={"critical-error-modal"}
		>
			<Modal.Header closeButton>
				<Modal.Title>Critical Error {criticalError?.status}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<p>A critical error has occurred and the application cannot continue.</p>
				<p>Details: </p>
				<pre>
					{JSON.stringify(criticalError, null, 2)}
				</pre>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="danger" onClick={() => window.location.reload()}>
                    Refresh page
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default CriticalError;