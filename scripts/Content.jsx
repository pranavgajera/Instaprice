import React, { useState, useEffect } from 'react';
import GoogleButton from './GoogleButton';
import Socket from './Socket';

export default function Content() {
    const [authenticated, setAuthentication] = useState(false);
    const [input, setInput] = useState('');

    useEffect(() => {
    Socket.on('connected', (data) => {
      setAuthentication(true);
    });

    }, []);
    const addformlist = (e) => {
        e.preventDefault();
        Socket.emit('new message', {
          item: input,
        });
        setInput('');
    };
    return(
        <div>
            <h2>
                InstaPrice
            </h2>
            {authenticated
                ? (
                    <>
                    <div className="footer">
                      <form htmlFor="newitem" onSubmit={addformlist}>
                        <label htmlFor="textbox">
                          <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                          />
                        </label>
                        <button variant="primary" type="submit" value="Submit">Submit</button>
                      </form>
                    </div>
                    </>
                ) : <GoogleButton />}

        </div>);
}