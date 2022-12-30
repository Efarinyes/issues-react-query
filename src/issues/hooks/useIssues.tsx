import { Issue, State } from "../interfaces"
import { githubApi } from '../../api/githupApi';
import { useQuery } from '@tanstack/react-query';
import { sleep } from "../../helpers/sleep";
import { useEffect, useState } from "react";

interface Props {
  state?: State
  labels: string[]
  pagina?: number
}

const getIssues = async( {labels, state, pagina = 1 }: Props ): Promise<Issue[]> => {

    await sleep(2)
    const params = new URLSearchParams()

    if (state) params.append('state', state)

    if (labels.length > 0) {
      const labelString = labels.join(',')
      params.append('labels', labelString)
    }

    params.append('page', pagina.toString())
    params.append('per_page', '5')


    const { data } = await githubApi.get<Issue[]>('/issues', { params })
  // console.log(data)
    return data
}

export const useIssues = ( { state, labels }:Props ) => {

    const [pagina, setPagina] = useState(1)

    useEffect(() => {
      setPagina(1)
    }, [state, labels])
    

    const issuesQuery = useQuery(
        ['issues', { state, labels, pagina }],
        () => getIssues({labels, state, pagina})
    )
    const novaPagina = () => {
      if (issuesQuery.data?.length === 0) return;
      setPagina( pagina +1 )
    }

    const paginaAnterior = () => {
      if (pagina > 1 ) setPagina( pagina -1 ) 
    }

  return {
    // Properties
    issuesQuery,

    // GetTER
    pagina: issuesQuery.isFetching ? 'Carregant...' : pagina,

    // Methods
    novaPagina,
    paginaAnterior
  }
}


