import '../styles/example1.css';

const Example1: React.FC = () => {
  return (
    <div className="container">
      <div className="header_title">
        <h2>Example 1</h2>
      </div>
      <div className="table_container">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Supplier</th>
              <th>Certificate type</th>
              <th>Valid from</th>
              <th>Valid to</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td>Kellia AG, 1, Berlin</td>
              <td>Permission of Printing</td>
              <td>21.08.2017</td>
              <td>26.08.2017</td>
            </tr>
            <tr>
              <td></td>
              <td>Kellia GmbH, 1, Stuttgart</td>
              <td>OHSAS 18001</td>
              <td>18.08.2017</td>
              <td>24.08.2017</td>
            </tr>
            <tr>
              <td></td>
              <td>Kellia GmbH, 1, Stuttgart</td>
              <td>Permission of Printing</td>
              <td>04.10.2017</td>
              <td>10.10.2017</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Example1;
