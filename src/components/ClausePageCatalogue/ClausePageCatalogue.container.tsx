import React, { PureComponent } from "react";
import ClausePageCatalogue from "./ClausePageCatalogue";
import ukRf from "content/ук-рф.json";
import { getClauseById } from "src/utils/ук-рф";

interface ClausePageCatalogueContainerProps {
  year: number;
  onClose: () => void;
  clauseId?: number;
}

interface ClausePageCatalogueContainerState {
  activePartId?: number;
  activeSectionId?: number;
  activeClauseId?: number;
}

class ClausePageCatalogueContainer extends PureComponent<
  ClausePageCatalogueContainerProps,
  ClausePageCatalogueContainerState
> {
  public constructor(props: ClausePageCatalogueContainerProps) {
    super(props);

    const clauseId = props.clauseId;
    let activePartId, activeSectionId, activeClauseId: number | undefined;
    if (clauseId !== undefined) {
      const { part, section } = getClauseById(clauseId);
      activePartId = part?.key;
      activeSectionId = section?.key;
      if (section) {
        activeClauseId = clauseId;
      }
    }
    this.state = {
      activePartId,
      activeSectionId,
      activeClauseId,
    };
  }

  render(): React.ReactNode {
    const { year, onClose } = this.props;
    const { activePartId, activeSectionId, activeClauseId } = this.state;

    const part = activePartId
      ? ukRf.find((p) => p.key === activePartId)
      : undefined;
    const section =
      part && activeSectionId
        ? part.children.find((s) => s.key === activeSectionId)
        : undefined;

    return (
      <ClausePageCatalogue
        parts={ukRf}
        sections={part?.children}
        clauses={section?.children}
        activePartId={activePartId}
        activeSectionId={activeSectionId}
        activeClauseKey={activeClauseId}
        onPartClick={this.handlePartClick}
        onSectionClick={this.handleSectionClick}
        year={year}
        onClose={onClose}
      ></ClausePageCatalogue>
    );
  }

  private handlePartClick = (id: number) => {
    this.setState({
      activePartId: id,
    });
  };

  private handleSectionClick = (id: number) => {
    this.setState({
      activeSectionId: id,
    });
  };
}

export default ClausePageCatalogueContainer;
