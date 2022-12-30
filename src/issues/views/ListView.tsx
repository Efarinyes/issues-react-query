import { useState } from 'react';
import { LoadingIcon } from '../../shared/components/LoadingIcon';
import { IssueList } from '../components/IssueList';
import { LabelPicker } from '../components/LabelPicker';
import { useIssues } from '../hooks';
import { State } from '../interfaces';


export const ListView = () => {

  const [selectedLabels, setSelectedLabels] = useState<string[]>([])
  const [state, setState] = useState<State>()


  const { issuesQuery, pagina, novaPagina, paginaAnterior } = useIssues({ state, labels: selectedLabels })

  const onLabelChange = (labelName: string) => {
    (selectedLabels.includes(labelName)
      ? setSelectedLabels(selectedLabels.filter(label => label !== labelName))
      : setSelectedLabels([...selectedLabels, labelName])
    )
  }

  return (
    <div className="row mt-5">

      <div className="col-8">
        {
          issuesQuery.isLoading
            ? (<LoadingIcon />)
            : (
              <IssueList
                issues={issuesQuery.data || []}
                state={state}
                onStateChanged={(newState) => setState(newState)}
              />
            )
        }
        <div className='d-flex mt-2 justify-content-between'>
          <button 
            className='btn btn-outline-primary'
            disabled = { issuesQuery.isFetching }
            onClick={() => paginaAnterior()}
          >Anterior
          </button>
          <span> {pagina} </span>
          <button 
            className='btn btn-outline-success'
            disabled = { issuesQuery.isFetching }
            onClick={() => novaPagina()}
            >Següent
          </button>
        </div>
      </div>


      <div className="col-4">
        <LabelPicker
          slectedLabels={selectedLabels}
          onChange={(labelName) => onLabelChange(labelName)}

        />
      </div>
    </div>
  )
}
